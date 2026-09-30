import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected structural engineering projects including civic buildings, higher education, libraries, historic renovation, mass timber, and mixed-use developments across the United States.",
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
