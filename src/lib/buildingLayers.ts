/**
 * Shared data + scroll math for the Exploded Building System experience.
 *
 * The first six entries map to procedural 3D geometry in BuildingModel.tsx.
 * The final entry ("final-render") is the reassembled payoff state and has
 * no geometry of its own — it represents the complete building.
 */

export interface BuildingLayer {
  id: string;
  /** Short index label, e.g. "01" */
  index: string;
  name: string;
  /** RSE service this layer maps to */
  service: string;
  description: string;
  /** Hex color used for the 3D geometry */
  color: string;
  /** Vertical distance (scene units) the layer travels when fully exploded */
  explodeOffset: number;
  /** Whether this layer has procedural geometry */
  hasGeometry: boolean;
}

export const BUILDING_LAYERS: BuildingLayer[] = [
  {
    id: "foundation",
    index: "01",
    name: "Foundation",
    service: "Structural Investigation & Feasibility",
    description:
      "Every building starts below grade. We assess soils, existing conditions, and load paths to design footings and foundations that carry the structure safely — the basis for everything above.",
    color: "#6f6a64",
    explodeOffset: 0,
    hasGeometry: true,
  },
  {
    id: "columns",
    index: "02",
    name: "Columns",
    service: "New Construction",
    description:
      "Vertical structure sets the rhythm of the building. We size and place columns to serve the architecture — keeping spans open and lines clean while carrying gravity and lateral loads.",
    color: "#8a8580",
    explodeOffset: 1.5,
    hasGeometry: true,
  },
  {
    id: "beams",
    index: "03",
    name: "Beams & Framing",
    service: "New Construction",
    description:
      "The horizontal frame ties the structure together and shapes each floor plate. We engineer beams and connections for efficiency and constructability, coordinating depths with the design.",
    color: "#8b7355",
    explodeOffset: 3.0,
    hasGeometry: true,
  },
  {
    id: "roof",
    index: "04",
    name: "Roof Structure",
    service: "New Construction & Adaptive Reuse",
    description:
      "The roof closes the form and resolves long spans, drainage, and rooftop loads. Whether new or inserted into an existing shell, we design it to perform and to fit the architecture.",
    color: "#4f4a45",
    explodeOffset: 4.5,
    hasGeometry: true,
  },
  {
    id: "envelope",
    index: "05",
    name: "Envelope",
    service: "Constructability & Peer Review",
    description:
      "The facade is where structure meets enclosure. We coordinate attachments, movement, and support so the envelope can be built as drawn — and we peer review complex assemblies for others.",
    color: "#9fb4c7",
    explodeOffset: 6.0,
    hasGeometry: true,
  },
  {
    id: "mep",
    index: "06",
    name: "MEP Coordination",
    service: "Design Coordination",
    description:
      "Mechanical, electrical, and plumbing systems thread through the structure. We coordinate penetrations, openings, and clearances early so systems and structure share space without conflict.",
    color: "#b08968",
    explodeOffset: 7.5,
    hasGeometry: true,
  },
  {
    id: "final-render",
    index: "07",
    name: "Final Render",
    service: "Construction Administration",
    description:
      "Everything comes back together. We stay involved through construction — reviewing shop drawings and visiting the site — so the building that gets built matches the one we engineered.",
    color: "#8b7355",
    explodeOffset: 0,
    hasGeometry: false,
  },
];

/** Layers that have 3D geometry (first six). */
export const GEOMETRY_LAYERS = BUILDING_LAYERS.filter((l) => l.hasGeometry);

/**
 * Explosion amount [0..1] as a function of overall scroll progress [0..1].
 * Ramp apart, hold, then reassemble into the final render.
 */
export function explodeAmount(p: number): number {
  if (p <= 0.55) return p / 0.55;
  if (p <= 0.78) return 1;
  return Math.max(0, 1 - (p - 0.78) / 0.22);
}

/** Active layer index [0..6] as a function of scroll progress [0..1]. */
export function activeLayerIndex(p: number): number {
  const i = Math.floor(p * BUILDING_LAYERS.length);
  return Math.min(BUILDING_LAYERS.length - 1, Math.max(0, i));
}
