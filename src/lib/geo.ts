function dms(v: number) {
  let d = Math.floor(v);
  let m = Math.round((v - d) * 60);
  if (m === 60) {
    d += 1;
    m = 0;
  }
  return `${d}°${String(m).padStart(2, '0')}′`;
}

/** −3.7319 → 3°44′S */
export const formatLat = (lat: number) => `${dms(Math.abs(lat))}${lat < 0 ? 'S' : 'N'}`;
/** −38.5267 → 38°32′O */
export const formatLon = (lon: number) => `${dms(Math.abs(lon))}${lon < 0 ? 'O' : 'L'}`;
