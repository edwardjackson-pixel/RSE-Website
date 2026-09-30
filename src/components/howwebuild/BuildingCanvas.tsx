"use client";

import { useRef, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import { EffectComposer, N8AO, Bloom, SMAA } from "@react-three/postprocessing";
import * as THREE from "three";
import BuildingModel from "@/components/howwebuild/BuildingModel";
import { explodeAmount } from "@/lib/buildingLayers";

type BuildingCanvasProps = {
  progressRef: RefObject<number>;
  activeStep: number;
  showAllLabels?: boolean;
};

/** Eases the camera up and back as the building explodes apart. */
function CameraRig({ progressRef }: { progressRef: RefObject<number> }) {
  const desiredPos = useRef(new THREE.Vector3(7, 4.5, 9));
  const target = useRef(new THREE.Vector3(0, 0, 0));
  const tmpTarget = useRef(new THREE.Vector3());

  useFrame((state) => {
    const p = progressRef.current ?? 0;
    const amt = explodeAmount(p);

    desiredPos.current.set(7 + amt * 2.6, 4.2 + amt * 3.6, 9 + amt * 2.4);
    state.camera.position.lerp(desiredPos.current, 0.045);

    tmpTarget.current.set(0, amt * 2.4, 0);
    target.current.lerp(tmpTarget.current, 0.045);
    state.camera.lookAt(target.current);
  });

  return null;
}

export default function BuildingCanvas({
  progressRef,
  activeStep,
  showAllLabels = false,
}: BuildingCanvasProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [7, 4.5, 9], fov: 40 }}
      gl={{ antialias: false, alpha: true }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[6, 11, 6]}
        intensity={1.3}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0004}
      >
        <orthographicCamera attach="shadow-camera" args={[-10, 10, 10, -10, 0.1, 40]} />
      </directionalLight>

      {/* In-memory studio environment for realistic glass + steel reflections */}
      <Environment resolution={256}>
        <Lightformer
          form="rect"
          intensity={3}
          position={[0, 6, -6]}
          scale={[12, 6, 1]}
          color="#ffffff"
        />
        <Lightformer
          form="rect"
          intensity={1.4}
          position={[6, 3, 4]}
          scale={[6, 6, 1]}
          color="#dfe7ee"
        />
        <Lightformer
          form="ring"
          intensity={1.6}
          position={[-6, 4, 3]}
          scale={[4, 4, 1]}
          color="#fff4e6"
        />
      </Environment>

      <CameraRig progressRef={progressRef} />

      <BuildingModel
        progressRef={progressRef}
        activeStep={activeStep}
        showAllLabels={showAllLabels}
      />

      <ContactShadows
        position={[0, -2.05, 0]}
        opacity={0.4}
        scale={16}
        blur={2.8}
        far={7}
        resolution={1024}
        color="#1a1a1a"
      />

      <EffectComposer multisampling={0} enableNormalPass>
        <N8AO halfRes aoRadius={1.4} distanceFalloff={1} intensity={2.2} />
        <Bloom
          intensity={0.4}
          luminanceThreshold={0.9}
          luminanceSmoothing={0.25}
          mipmapBlur
        />
        <SMAA />
      </EffectComposer>
    </Canvas>
  );
}
