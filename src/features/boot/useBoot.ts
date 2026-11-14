import { useCallback, useEffect, useState } from 'react';
import { profile } from '../../content/profile';
import { formatLat, formatLon } from '../../lib/geo';
import { LAYERS } from '../../app/sections';
import { useMotion } from '../../hooks/useMotion';

const KEY = 'sonda:boot';
const STEP_MS = 200;

/** Linhas do log de sessão: todas montadas a partir de dados reais. */
export function bootLines(now = new Date()): string[] {
  const github = profile.links.find((l) => l.kind === 'github');
  const date = now.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/\./g, '');
  return [
    `> sonda iniciada · ${date}`,
    `> resolvendo alvo: ${profile.handle}`,
    `> base: ${profile.base.city} ${formatLat(profile.base.lat)} ${formatLon(profile.base.lon)} · ${profile.base.utcOffset}`,
    github ? `> fonte: ${github.href.replace(/^https?:\/\//, '')}` : '> fonte: currículo',
    `> camadas: ${LAYERS} · travas ativas: 0`,
    '> alvo travado.',
  ];
}

function alreadyBooted(): boolean {
  try {
    return sessionStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
}

/**
 * N1: o log "digita" uma linha a cada 200 ms (6 linhas ≈ 1,2 s). Roda uma vez por sessão;
 * sem movimento, ou depois de pular (Esc / botão), já nasce completo.
 */
export function useBoot() {
  const { animate } = useMotion();
  const lines = bootLines();
  const [skipped, setSkipped] = useState(() => alreadyBooted());
  const [shown, setShown] = useState(0);
  const done = !animate || skipped || shown >= lines.length;

  const skip = useCallback(() => setSkipped(true), []);

  useEffect(() => {
    if (!animate || skipped) return;
    const id = window.setInterval(() => setShown((n) => n + 1), STEP_MS);
    return () => window.clearInterval(id);
  }, [animate, skipped]);

  useEffect(() => {
    if (!done) return;
    try {
      sessionStorage.setItem(KEY, '1');
    } catch {
      /* sem storage */
    }
  }, [done]);

  useEffect(() => {
    if (done) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && skip();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [done, skip]);

  return { lines: done ? lines : lines.slice(0, shown), done, skip };
}
