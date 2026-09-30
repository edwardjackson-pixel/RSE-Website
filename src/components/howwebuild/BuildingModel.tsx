"use client";

import { useRef, type ReactNode, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Line } from "@react-three/drei";
import * as THREE from "three";
import {
  BUILDING_LAYERS,
  GEOMETRY_LAYERS,
  activeLayerIndex,
  explodeAmount,
  type BuildingLayer,
} from "@/lib/buildingLayers";
import {
  IBeam,
  RibbedDeck,
  CurtainWall,
  COLUMN_PROFILE,
  BEAM_PROFILE,
} from "@/components/howwebuild/StructuralElements";

type BuildingModelProps = {
  /** Current scroll progress [0..1]. */
  progressRef: RefObject<number>;
  /** Active layer index for label emphasis. */
  activeStep: number;
  /** Show every layer's label at once (reduced-motion / static view). */
  showAllLabels?: boolean;
};

const FOOT = 1.45; // structural grid half-width
const COL_H = 3; // column height
const COL_BASE_Y = 0.3; // top of foundation
const BEAM_Y = COL_BASE_Y + COL_H; // top of frame
const GRID_X = [-FOOT, 0, FOOT] as const;
const GRID_Z = [-FOOT, FOOT] as const;

/** Vertical center used to anchor each layer's annotation. */
const LABEL_ANCHOR_Y: Record<string, number> = {
  foundation: 0.15,
  columns: COL_BASE_Y + COL_H / 2,
  beams: BEAM_Y,
  roof: BEAM_Y + 0.45,
  envelope: COL_BASE_Y + COL_H / 2,
  mep: COL_BASE_Y + COL_H / 2,
};

function lerp(current: number, target: number, t: number) {
  return current + (target - current) * t;
}

/* ------------------------------------------------------------------ */
/*  Per-layer geometry                                                 */
/* ------------------------------------------------------------------ */

function LayerGeometry({ id, color }: { id: string; color: string }) {
  switch (id) {
    case "foundation":
      return (
        <group>
          <mesh position={[0, 0.12, 0]} receiveShadow castShadow>
            <boxGeometry args={[3.7, 0.24, 3.7]} />
            <meshStandardMaterial color={color} roughness={0.95} metalness={0.02} />
          </mesh>
          {/* Footing pads under each column */}
          {GRID_X.flatMap((x) =>
            GRID_Z.map((z) => (
              <mesh key={`${x}-${z}`} position={[x, 0.28, z]} castShadow receiveShadow>
                <boxGeometry args={[0.55, 0.18, 0.55]} />
                <meshStandardMaterial color="#857f78" roughness={0.95} metalness={0.02} />
              </mesh>
            ))
          )}
        </group>
      );

    case "columns":
      return (
        <group>
          {GRID_X.flatMap((x) =>
            GRID_Z.map((z) => (
              <IBeam
                key={`${x}-${z}`}
                length={COL_H}
                axis="y"
                profile={COLUMN_PROFILE}
                position={[x, COL_BASE_Y + COL_H / 2, z]}
                color={color}
              />
            ))
          )}
          {/* Lateral bracing on the back bay */}
          {[
            { from: [-FOOT, COL_BASE_Y, -FOOT], to: [0, BEAM_Y, -FOOT] },
            { from: [FOOT, COL_BASE_Y, -FOOT], to: [0, BEAM_Y, -FOOT] },
          ].map((b, i) => {
            const from = new THREE.Vector3(...(b.from as [number, number, number]));
            const to = new THREE.Vector3(...(b.to as [number, number, number]));
            const mid = from.clone().add(to).multiplyScalar(0.5);
            const len = from.distanceTo(to);
            const dir = to.clone().sub(from).normalize();
            const quat = new THREE.Quaternion().setFromUnitVectors(
              new THREE.Vector3(0, 1, 0),
              dir
            );
            return (
              <mesh
                key={i}
                position={mid.toArray()}
                quaternion={quat}
                castShadow
              >
                <boxGeometry args={[0.1, len, 0.1]} />
                <meshStandardMaterial
                  color={color}
                  metalness={0.9}
                  roughness={0.45}
                  emissive={color}
                  emissiveIntensity={0}
                />
              </mesh>
            );
          })}
        </group>
      );

    case "beams":
      return (
        <group>
          {/* Perimeter + interior beams along X */}
          {GRID_Z.map((z, i) => (
            <IBeam
              key={`bx-${i}`}
              length={FOOT * 2 + 0.3}
              axis="x"
              profile={BEAM_PROFILE}
              position={[0, BEAM_Y, z]}
              color={color}
            />
          ))}
          {/* Girders along Z */}
          {GRID_X.map((x, i) => (
            <IBeam
              key={`bz-${i}`}
              length={FOOT * 2}
              axis="z"
              profile={BEAM_PROFILE}
              position={[x, BEAM_Y, 0]}
              color={color}
            />
          ))}
          {/* Composite floor deck on the frame */}
          <RibbedDeck
            width={FOOT * 2 + 0.4}
            depth={FOOT * 2 + 0.4}
            position={[0, BEAM_Y + 0.2, 0]}
            color="#8a847c"
          />
        </group>
      );

    case "roof":
      return (
        <group>
          <RibbedDeck
            width={3.9}
            depth={3.9}
            position={[0, BEAM_Y + 0.45, 0]}
            color={color}
          />
          {/* Parapet ring */}
          {[
            { a: [3.9, 0.22, 0.08] as [number, number, number], p: [0, BEAM_Y + 0.6, 1.95] as [number, number, number] },
            { a: [3.9, 0.22, 0.08] as [number, number, number], p: [0, BEAM_Y + 0.6, -1.95] as [number, number, number] },
            { a: [0.08, 0.22, 3.9] as [number, number, number], p: [1.95, BEAM_Y + 0.6, 0] as [number, number, number] },
            { a: [0.08, 0.22, 3.9] as [number, number, number], p: [-1.95, BEAM_Y + 0.6, 0] as [number, number, number] },
          ].map((seg, i) => (
            <mesh key={i} position={seg.p} castShadow>
              <boxGeometry args={seg.a} />
              <meshStandardMaterial
                color={color}
                roughness={0.7}
                metalness={0.15}
                emissive={color}
                emissiveIntensity={0}
              />
            </mesh>
          ))}
        </group>
      );

    case "envelope":
      return (
        <CurtainWall
          size={3.0}
          height={COL_H}
          position={[0, COL_BASE_Y + COL_H / 2, 0]}
          glassColor={color}
        />
      );

    case "mep": {
      const pipeX = 0.8;
      return (
        <group>
          {/* Copper risers */}
          {[-pipeX, pipeX].map((x, i) => (
            <mesh key={i} position={[x, COL_BASE_Y + COL_H / 2, 0.7]} castShadow>
              <cylinderGeometry args={[0.08, 0.08, COL_H - 0.3, 16]} />
              <meshStandardMaterial
                color={color}
                roughness={0.35}
                metalness={0.7}
                emissive={color}
                emissiveIntensity={0}
              />
            </mesh>
          ))}
          {/* Rectangular supply duct */}
          <mesh position={[0, COL_BASE_Y + COL_H - 0.45, -0.55]} castShadow>
            <boxGeometry args={[2.3, 0.34, 0.34]} />
            <meshStandardMaterial
              color="#b9bcc0"
              roughness={0.4}
              metalness={0.6}
              emissive="#b9bcc0"
              emissiveIntensity={0}
            />
          </mesh>
          {/* Duct drop + branch */}
          <mesh position={[0.6, COL_BASE_Y + 1.4, -0.55]} castShadow>
            <boxGeometry args={[0.26, 1.5, 0.26]} />
            <meshStandardMaterial
              color="#b9bcc0"
              roughness={0.4}
              metalness={0.6}
              emissive="#b9bcc0"
              emissiveIntensity={0}
            />
          </mesh>
          <mesh
            position={[-0.2, COL_BASE_Y + 0.9, 0]}
            rotation={[0, 0, Math.PI / 2]}
            castShadow
          >
            <cylinderGeometry args={[0.055, 0.055, 1.8, 12]} />
            <meshStandardMaterial
              color={color}
              roughness={0.35}
              metalness={0.7}
              emissive={color}
              emissiveIntensity={0}
            />
          </mesh>
        </group>
      );
    }

    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/*  Annotated leader-line label                                        */
/* ------------------------------------------------------------------ */

function LayerLabel({ layer, visible }: { layer: BuildingLayer; visible: boolean }) {
  const y = LABEL_ANCHOR_Y[layer.id] ?? 1.8;
  const anchor: [number, number, number] = [1.95, y, 0];
  const elbow: [number, number, number] = [3.0, y + 0.35, 0];
  const labelPos: [number, number, number] = [3.15, y + 0.35, 0];

  return (
    <group visible={visible}>
      <Line
        points={[anchor, elbow]}
        color="#8b7355"
        lineWidth={1.5}
        transparent
        opacity={visible ? 0.9 : 0}
      />
      <mesh position={anchor}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshBasicMaterial color="#8b7355" />
      </mesh>
      <Html
        position={labelPos}
        center={false}
        zIndexRange={[20, 0]}
        style={{ pointerEvents: "none" }}
      >
        <div
          style={{
            transform: "translateY(-50%)",
            whiteSpace: "nowrap",
            background: "rgba(26,26,26,0.92)",
            color: "#fff",
            padding: "8px 12px",
            borderLeft: "2px solid #8b7355",
            boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.35s ease",
            fontFamily: "var(--font-heading, system-ui)",
          }}
        >
          <div
            style={{
              fontSize: "10px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#c9a986",
            }}
          >
            {layer.index} · {layer.service}
          </div>
          <div style={{ fontSize: "14px", fontWeight: 700, marginTop: "2px" }}>
            {layer.name}
          </div>
        </div>
      </Html>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Model                                                              */
/* ------------------------------------------------------------------ */

export default function BuildingModel({
  progressRef,
  activeStep,
  showAllLabels = false,
}: BuildingModelProps) {
  const rootRef = useRef<THREE.Group>(null);
  const groupRefs = useRef<(THREE.Group | null)[]>([]);

  useFrame(() => {
    const p = progressRef.current ?? 0;
    const amt = explodeAmount(p);
    const active = activeLayerIndex(p);

    GEOMETRY_LAYERS.forEach((layer, i) => {
      const g = groupRefs.current[i];
      if (!g) return;

      const targetY = layer.explodeOffset * amt;
      g.position.y = lerp(g.position.y, targetY, 0.12);

      const targetScale = i === active ? 1.04 : 1;
      g.scale.setScalar(lerp(g.scale.x, targetScale, 0.12));

      // Emissive highlight on the active layer's materials.
      const targetEmissive = i === active ? 0.32 : 0;
      g.traverse((obj) => {
        const mat = (obj as THREE.Mesh).material as
          | THREE.MeshStandardMaterial
          | undefined;
        if (mat && "emissiveIntensity" in mat && mat.emissive) {
          mat.emissiveIntensity = lerp(mat.emissiveIntensity, targetEmissive, 0.1);
        }
      });
    });

    if (rootRef.current) {
      const targetRot = -0.3 + p * 0.5;
      rootRef.current.rotation.y = lerp(rootRef.current.rotation.y, targetRot, 0.05);
    }
  });

  return (
    <group ref={rootRef} position={[0, -1.8, 0]}>
      {GEOMETRY_LAYERS.map((layer, i) => (
        <group
          key={layer.id}
          ref={(el): void => {
            groupRefs.current[i] = el;
          }}
        >
          <LayerGeometry id={layer.id} color={layer.color} />
          <LayerLabel
            layer={layer}
            visible={showAllLabels || i === activeStep}
          />
        </group>
      ))}
      {/* Final-render label appears when reassembled */}
      <LayerLabel
        layer={BUILDING_LAYERS[BUILDING_LAYERS.length - 1]}
        visible={!showAllLabels && activeStep === BUILDING_LAYERS.length - 1}
      />
    </group>
  ) as ReactNode;
}
