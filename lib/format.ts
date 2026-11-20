/** Shared date helpers so Stage 2 cards can compute ranges/durations. */

export function formatMonth(value: string): string {
  if (!value) return '';
  if (value.toLowerCase() === 'present' || value.toLowerCase() === 'current') {
    return 'Present';
  }
  const [year, month] = value.split('-');
  const date = new Date(Number(year), Number(month ?? '1') - 1, 1);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export function formatRange(start: string, end: string): string {
  return `${formatMonth(start)} — ${formatMonth(end)}`;
}

export function durationLabel(start: string, end: string): string {
  const parse = (value: string) => {
    if (!value || value.toLowerCase() === 'present') return new Date();
    const [year, month] = value.split('-');
    return new Date(Number(year), Number(month ?? '1') - 1, 1);
  };

  const from = parse(start);
  const to = parse(end);
  const months =
    (to.getFullYear() - from.getFullYear()) * 12 +
    (to.getMonth() - from.getMonth());

  if (months <= 0) return 'less than a month';
  const years = Math.floor(months / 12);
  const remainder = months % 12;
  if (!years) return `${remainder} mo`;
  if (!remainder) return `${years} yr`;
  return `${years} yr ${remainder} mo`;
}
