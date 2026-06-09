export function generateShareId(name: string, date: string): string {
  const base = `${name}-${date}`.toLowerCase().replace(/\s+/g, "-");
  const hash = Array.from(base).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return `cs-${hash.toString(36)}-demo`;
}
