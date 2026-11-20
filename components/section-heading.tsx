export function SectionHeading({
  title,
  subtitle,
  id,
  as: Tag = 'h2',
}: {
  title: string;
  subtitle?: string;
  id?: string;
  as?: 'h1' | 'h2';
}) {
  return (
    <div className="mb-9">
      <Tag id={id} className="section-title">
        {title}
      </Tag>
      <div className="section-divider" />
      {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
    </div>
  );
}
