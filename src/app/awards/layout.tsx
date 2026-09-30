import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Awards",
  description:
    "Awards and recognition for RSE Associates structural engineering projects, including honors from the Boston Society of Architects, AIA, Preservation Massachusetts, and more.",
};

export default function AwardsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
