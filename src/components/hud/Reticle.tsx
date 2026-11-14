import { useEffect, useRef } from 'react';
import { useMotion } from '../../hooks/useMotion';
import { useMediaQuery } from '../../hooks/useMediaQuery';

/**
 * A2: mira que segue o cursor e trava em elementos [data-scan] (TRAVAR).
 * Camada decorativa acima do cursor nativo: pointer-events: none, aria-hidden.
 * Só com ponteiro fino e movimento ligado.
 */
export function Reticle() {
  const { animate } = useMotion();
  const fine = useMediaQuery('(pointer: fine)');
  if (!animate || !fine) return null;
  return <ReticleLayer />;
}

function ReticleLayer() {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const cur = { x: -100, y: -100, w: 26, h: 26 };
    const goal = { x: -100, y: -100, w: 26, h: 26 };
    let raf = 0;
    let locked = false;

    const onMove = (e: PointerEvent) => {
      const target = (e.target as Element | null)?.closest?.('[data-scan]');
      if (target) {
        const r = target.getBoundingClientRect();
        goal.x = r.left - 8;
        goal.y = r.top - 8;
        goal.w = r.width + 16;
        goal.h = r.height + 16;
        locked = true;
      } else {
        goal.x = e.clientX - 13;
        goal.y = e.clientY - 13;
        goal.w = 26;
        goal.h = 26;
        locked = false;
      }
      el.dataset.locked = String(locked);
    };

    const tick = () => {
      // lag ≈ 80 ms no cursor livre; trava mais firme (≈ 180 ms)
      const k = locked ? 0.28 : 0.38;
      cur.x += (goal.x - cur.x) * k;
      cur.y += (goal.y - cur.y) * k;
      cur.w += (goal.w - cur.w) * k;
      cur.h += (goal.h - cur.h) * k;
      el.style.transform = `translate(${cur.x}px, ${cur.y}px)`;
      el.style.width = `${cur.w}px`;
      el.style.height = `${cur.h}px`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={box}
      aria-hidden="true"
      data-locked="false"
      className="pointer-events-none fixed top-0 left-0 z-[90] text-text-3 data-[locked=true]:text-data"
      style={{ width: 26, height: 26, transform: 'translate(-100px,-100px)' }}
    >
      <i className="absolute top-0 left-0 size-3.5 border-t-2 border-l-2 border-current" />
      <i className="absolute top-0 right-0 size-3.5 border-t-2 border-r-2 border-current" />
      <i className="absolute bottom-0 left-0 size-3.5 border-b-2 border-l-2 border-current" />
      <i className="absolute right-0 bottom-0 size-3.5 border-r-2 border-b-2 border-current" />
    </div>
  );
}
