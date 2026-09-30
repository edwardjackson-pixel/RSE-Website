interface OfficeCardProps {
  label: string;
  address: string;
  cityState: string;
  isPrimary?: boolean;
}

export default function OfficeCard({ label, address, cityState, isPrimary = false }: OfficeCardProps) {
  return (
    <div className="border border-stone-200 p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-4">
        <h3 className="font-heading text-lg font-semibold text-charcoal">{label}</h3>
        {isPrimary && (
          <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-accent border border-accent/30 px-2 py-0.5">
            Headquarters
          </span>
        )}
      </div>
      <address className="not-italic text-stone-600 text-sm leading-relaxed">
        {address}
        <br />
        {cityState}
      </address>
    </div>
  );
}
