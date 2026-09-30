interface ServiceCardProps {
  title: string;
  description: string;
  index: number;
}

export default function ServiceCard({ title, description, index }: ServiceCardProps) {
  return (
    <article className="group relative border-t border-stone-200 pt-8 pb-8 service-card-hover">
      <div className="flex items-start gap-6">
        <span className="text-xs font-mono text-stone-400 mt-1 shrink-0 w-8">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <h3 className="font-heading text-xl font-semibold text-charcoal group-hover:text-accent transition-colors duration-200">
            {title}
          </h3>
          <p className="mt-3 text-stone-600 leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}
