import { useCallback, useEffect, useState } from 'react';
import { projects } from '../../content/projects';

const PREFIX = '#projeto-';

function readHash(): string | null {
  const h = window.location.hash;
  if (!h.startsWith(PREFIX)) return null;
  const id = h.slice(PREFIX.length);
  return projects.some((p) => p.id === id) ? id : null;
}

/** Projeto aberto sincronizado com a URL (#projeto-id) para permitir links diretos. */
export function useProjectHash() {
  const [openId, setOpenId] = useState<string | null>(() => readHash());

  useEffect(() => {
    const onHash = () => setOpenId(readHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const open = useCallback((id: string) => {
    history.replaceState(null, '', `${PREFIX}${id}`);
    setOpenId(id);
  }, []);

  const close = useCallback(() => {
    history.replaceState(null, '', '#projetos');
    setOpenId(null);
  }, []);

  return { openId, open, close };
}
