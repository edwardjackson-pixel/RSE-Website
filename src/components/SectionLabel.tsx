interface SectionLabelProps {
  children: React.ReactNode;
}

export default function SectionLabel({ children }: SectionLabelProps) {
  return (
    <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-stone-400 border-b border-stone-300 pb-2 mb-6">
      {children}
    </span>
  );
}
