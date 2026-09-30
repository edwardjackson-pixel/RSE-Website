import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact RSE Associates for structural engineering services. Offices in Watertown, MA (Boston), Los Angeles, CA, and Port Washington, NY. Phone: (617) 926-9300.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
