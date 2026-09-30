"use client";

import { useMemo } from "react";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  Wide-flange (W-shape) steel profiles                               */
/* ------------------------------------------------------------------ */

export interface WProfile {
  /** Overall depth (web height) */
  d: number;
  /** Flange width */
  bf: number;
  /** Flange thickness */
  tf: number;
  /** Web thickness */
  tw: number;
}

export const COLUMN_PROFILE: WProfile = { d: 0.34, bf: 0.3, tf: 0.05, tw: 0.035 };
export const BEAM_PROFILE: WProfile = { d: 0.3, bf: 0.2, tf: 0.045, tw: 0.03 };

/** Build an I-shaped cross-section centered on the origin in the XY plane. */
function makeWShape({ d, bf, tf, tw }: WProfile): THREE.Shape {
  const hb = bf / 2;
  const hd = d / 2;
  const hw = tw / 2;

  const s = new THREE.Shape();
  s.moveTo(-hb, -hd);
  s.lineTo(hb, -hd);
  s.lineTo(hb, -hd + tf);
  s.lineTo(hw, -hd + tf);
  s.lineTo(hw, hd - tf);
  s.lineTo(hb, hd - tf);
  s.lineTo(hb, hd);
  s.lineTo(-hb, hd);
  s.lineTo(-hb, hd - tf);
  s.lineTo(-hw, hd - tf);
  s.lineTo(-hw, -hd + tf);
  s.lineTo(-hb, -hd + tf);
  s.closePath();
  return s;
}

type Axis = "x" | "y" | "z";

const AXIS_ROTATION: Record<Axis, [number, number, number]> = {
  x: [0, Math.PI / 2, 0],
  y: [Math.PI / 2, 0, 0],
  z: [0, 0, 0],
};

interface IBeamProps {
  length: number;
  axis?: Axis;
  profile?: WProfile;
  position?: [number, number, number];
  color?: string;
}

/** A wide-flange steel member extruded from a real I-shaped profile. */
export function IBeam({
  length,
  axis = "y",
  profile = COLUMN_PROFILE,
  position = [0, 0, 0],
  color = "#9a948c",
}: IBeamProps) {
  const geometry = useMemo(() => {
    const g = new THREE.ExtrudeGeometry(makeWShape(profile), {
      depth: length,
      bevelEnabled: false,
      steps: 1,
    });
    g.translate(0, 0, -length / 2);
    g.computeVertexNormals();
    return g;
  }, [length, profile]);

  return (
    <mesh
      geometry={geometry}
      position={position}
      rotation={AXIS_ROTATION[axis]}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial
        color={color}
        metalness={0.92}
        roughness={0.42}
        emissive={color}
        emissiveIntensity={0}
        envMapIntensity={1.1}
      />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/*  Ribbed metal deck (floor / roof plate)                             */
/* ------------------------------------------------------------------ */

interface RibbedDeckProps {
  width: number;
  depth: number;
  position?: [number, number, number];
  color?: string;
  ribs?: number;
}

export function RibbedDeck({
  width,
  depth,
  position = [0, 0, 0],
  color = "#7c766e",
  ribs = 16,
}: RibbedDeckProps) {
  const ribWidth = (width / ribs) * 0.5;
  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, 0.05, depth]} />
        <meshStandardMaterial
          color={color}
          metalness={0.65}
          roughness={0.5}
          emissive={color}
          emissiveIntensity={0}
          envMapIntensity={0.8}
        />
      </mesh>
      {Array.from({ length: ribs }).map((_, i) => {
        const t = i / (ribs - 1) - 0.5;
        return (
          <mesh key={i} position={[t * width, 0.045, 0]} castShadow>
            <boxGeometry args={[ribWidth, 0.07, depth]} />
            <meshStandardMaterial
              color={color}
              metalness={0.7}
              roughness={0.45}
              emissive={color}
              emissiveIntensity={0}
              envMapIntensity={0.9}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Curtain wall — mullion grid + glazing                              */
/* ------------------------------------------------------------------ */

interface CurtainWallProps {
  size: number;
  height: number;
  position?: [number, number, number];
  glassColor?: string;
  mullionColor?: string;
}

export function CurtainWall({
  size,
  height,
  position = [0, 0, 0],
  glassColor = "#a9c2d6",
  mullionColor = "#33312e",
}: CurtainWallProps) {
  const half = size / 2;
  const h2 = height / 2;
  const t = 0.05; // mullion thickness
  const gridX = [-half, 0, half];
  const yLevels = [-h2, -h2 + height / 3, -h2 + (2 * height) / 3, h2];

  const Mullion = (props: {
    args: [number, number, number];
    position: [number, number, number];
  }) => (
    <mesh position={props.position} castShadow>
      <boxGeometry args={props.args} />
      <meshStandardMaterial
        color={mullionColor}
        metalness={0.85}
        roughness={0.4}
        emissive={mullionColor}
        emissiveIntensity={0}
        envMapIntensity={1}
      />
    </mesh>
  );

  return (
    <group position={position}>
      {/* Glazing on each of the four faces */}
      {[
        { p: [0, 0, half] as [number, number, number], a: [size, height, 0.02] as [number, number, number] },
        { p: [0, 0, -half] as [number, number, number], a: [size, height, 0.02] as [number, number, number] },
        { p: [half, 0, 0] as [number, number, number], a: [0.02, height, size] as [number, number, number] },
        { p: [-half, 0, 0] as [number, number, number], a: [0.02, height, size] as [number, number, number] },
      ].map((g, i) => (
        <mesh key={`glass-${i}`} position={g.p}>
          <boxGeometry args={g.a} />
          <meshPhysicalMaterial
            color={glassColor}
            transparent
            opacity={0.16}
            roughness={0.05}
            metalness={0}
            transmission={0.7}
            thickness={0.4}
            ior={1.45}
            side={THREE.DoubleSide}
            envMapIntensity={1.4}
          />
        </mesh>
      ))}

      {/* Vertical mullions on front/back faces */}
      {gridX.map((x, i) => (
        <Mullion key={`vf-${i}`} args={[t, height, t]} position={[x, 0, half]} />
      ))}
      {gridX.map((x, i) => (
        <Mullion key={`vb-${i}`} args={[t, height, t]} position={[x, 0, -half]} />
      ))}
      {/* Vertical mullions on side faces */}
      {gridX.map((z, i) => (
        <Mullion key={`vl-${i}`} args={[t, height, t]} position={[half, 0, z]} />
      ))}
      {gridX.map((z, i) => (
        <Mullion key={`vr-${i}`} args={[t, height, t]} position={[-half, 0, z]} />
      ))}

      {/* Horizontal transoms forming a ring at each level */}
      {yLevels.map((y, i) => (
        <group key={`ring-${i}`}>
          <Mullion args={[size, t, t]} position={[0, y, half]} />
          <Mullion args={[size, t, t]} position={[0, y, -half]} />
          <Mullion args={[t, t, size]} position={[half, y, 0]} />
          <Mullion args={[t, t, size]} position={[-half, y, 0]} />
        </group>
      ))}
    </group>
  );
}
