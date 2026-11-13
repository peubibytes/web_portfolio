/** Formata latitude/longitude geográficas: −23.5505 → 23°33′S */
export function formatLat(lat: number) {
  return `${dms(Math.abs(lat))}${lat < 0 ? 'S' : 'N'}`;
}

export function formatLon(lon: number) {
  return `${dms(Math.abs(lon))}${lon < 0 ? 'O' : 'L'}`;
}

function dms(v: number) {
  let d = Math.floor(v);
  let m = Math.round((v - d) * 60);
  if (m === 60) {
    d += 1;
    m = 0;
  }
  return `${d}°${String(m).padStart(2, '0')}′`;
}

/** Ascensão reta em horas: 19.4 → "19h 24m" */
export function formatRA(ra: number) {
  let h = Math.floor(ra);
  let m = Math.round((ra - h) * 60);
  if (m === 60) {
    h = (h + 1) % 24;
    m = 0;
  }
  return `${String(h).padStart(2, '0')}h ${String(m).padStart(2, '0')}m`;
}

/** Declinação em graus: 28 → "+28°" · −18 → "−18°" */
export function formatDec(dec: number) {
  const sign = dec < 0 ? '−' : '+';
  return `${sign}${String(Math.abs(Math.round(dec))).padStart(2, '0')}°`;
}

/** Código de catálogo: índice 0 → "P-01" */
export const catalogCode = (prefix: string, i: number) => `${prefix}-${String(i + 1).padStart(2, '0')}`;
