const CORNERS = [
  { style: { top: 0, left: 0 }, t: 'translate(-50%,-50%)' },
  { style: { top: 0, right: 0 }, t: 'translate(50%,-50%)' },
  { style: { bottom: 0, left: 0 }, t: 'translate(-50%,50%)' },
  { style: { bottom: 0, right: 0 }, t: 'translate(50%,50%)' },
];

/** Marcas de registro (cruzetas) nos cantos de uma placa ou ficha. */
export function RegMarks({ className = 'text-ink/60' }: { className?: string }) {
  return (
    <>
      {CORNERS.map((c, i) => (
        <svg
          key={i}
          aria-hidden="true"
          viewBox="0 0 16 16"
          className={`pointer-events-none absolute h-4 w-4 ${className}`}
          style={{ ...c.style, transform: c.t }}
        >
          <path d="M8 0v16M0 8h16" stroke="currentColor" strokeWidth="1" />
          <circle cx="8" cy="8" r="3.5" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      ))}
    </>
  );
}
