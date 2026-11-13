/** 'YYYY' | 'YYYY-MM' | 'present' → ano decimal (2023-07 → 2023.5) */
export function toYear(value: string, now = new Date()): number {
  if (value === 'present') return now.getFullYear() + now.getMonth() / 12;
  const [y, m] = value.split('-');
  const year = Number(y);
  const month = m ? Number(m) - 1 : 0;
  if (!Number.isFinite(year)) throw new Error(`data inválida: ${value}`);
  return year + month / 12;
}

const MONTHS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

/** '2023-02' → 'fev 2023' · 'present' → 'hoje' */
export function formatMonth(value: string) {
  if (value === 'present') return 'hoje';
  const [y, m] = value.split('-');
  return m ? `${MONTHS[Number(m) - 1]} ${y}` : `${y}`;
}
