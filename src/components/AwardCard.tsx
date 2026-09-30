interface AwardCardProps {
  year: number;
  title: string;
  organization: string;
  project: string;
}

export default function AwardCard({ year, title, organization, project }: AwardCardProps) {
  return (
    <article className="group border-t border-stone-200 py-6 grid grid-cols-[auto_1fr] gap-6 items-start award-card-hover">
      <span className="font-heading text-2xl font-bold text-stone-300 group-hover:text-accent transition-colors duration-200 w-16">
        {year}
      </span>
      <div>
        <h3 className="font-heading text-base font-semibold text-charcoal leading-snug">
          {title}
        </h3>
        <p className="text-sm text-stone-500 mt-1">{organization}</p>
        <p className="text-sm text-accent mt-1">{project}</p>
      </div>
    </article>
  );
}
