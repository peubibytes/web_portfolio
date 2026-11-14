import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { LazyMotion, MotionConfig, domAnimation } from 'motion/react';
import { useReducedMotion } from './useReducedMotion';

const KEY = 'sonda:movimento';

interface Ctx {
  /** Animações ligadas (preferência do sistema + toggle manual). */
  animate: boolean;
  toggle: () => void;
}
const MotionCtx = createContext<Ctx>({ animate: false, toggle: () => {} });

function readOff(): boolean {
  try {
    return localStorage.getItem(KEY) === 'off';
  } catch {
    return false;
  }
}

export function MotionProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const [off, setOff] = useState(readOff);
  const toggle = useCallback(() => {
    setOff((v) => {
      try {
        localStorage.setItem(KEY, v ? 'on' : 'off');
      } catch {
        /* sem storage: vale só nesta sessão */
      }
      return !v;
    });
  }, []);
  const animate = !reduced && !off;
  const value = useMemo(() => ({ animate, toggle }), [animate, toggle]);
  return (
    <MotionCtx.Provider value={value}>
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion={animate ? 'user' : 'always'}>{children}</MotionConfig>
      </LazyMotion>
    </MotionCtx.Provider>
  );
}

export const useMotion = () => useContext(MotionCtx);
