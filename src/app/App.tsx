import { useCallback, useState } from 'react';
import { Hero } from '../features/hero/Hero';
import { About } from '../features/about/About';
import { Implants } from '../features/implants/Implants';
import { Experience } from '../features/experience/Experience';
import { Projects } from '../features/projects/Projects';
import { Contact } from '../features/contact/Contact';
import { profile } from '../content/profile';
import { useActiveSection } from '../hooks/useActiveSection';
import { MotionProvider, useMotion } from '../hooks/useMotion';
import { Reticle } from '../components/hud/Reticle';
import { SondaBar } from './SondaBar';
import { MobileMenu } from './MobileMenu';

function Shell() {
  const active = useActiveSection();
  const { animate } = useMotion();
  const [menu, setMenu] = useState(false);
  const closeMenu = useCallback(() => setMenu(false), []);
  const repo = profile.links.find((l) => l.kind === 'github');

  return (
    <div className={animate ? '' : 'no-motion'}>
      <SondaBar active={active} menuOpen={menu} onMenu={() => setMenu(true)} />
      <MobileMenu open={menu} active={active} onClose={closeMenu} />
      <Reticle />

      <main id="main" tabIndex={-1} className="pt-12 pb-24 outline-none md:pt-14 md:pb-0">
        <Hero />
        <About />
        <Implants />
        <Experience />
        <Projects />
        <Contact />
      </main>

      {/* CTA fixo no celular: some quando o contato já está na tela */}
      {active !== 'inicio' && active !== 'contato' && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-void px-4 pt-3 pb-5 md:hidden">
          <a href="#contato" className="btn w-full justify-between !min-h-12">
            <span>Abrir canal</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      )}

      <footer className="mx-auto max-w-[90rem] px-4 pb-10 md:px-16">
        <p className="hud flex flex-wrap justify-between gap-x-8 gap-y-2 border-t border-line pt-4 text-text-3">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span>sessão compilada em {__BUILD_DATE__}</span>
          <span className="text-signal">canal mantido aberto pelo alvo</span>
          {repo && (
            <a href={repo.href} target="_blank" rel="noopener noreferrer" className="link">
              código-fonte ↗
            </a>
          )}
        </p>
      </footer>
    </div>
  );
}

export function App() {
  return (
    <MotionProvider>
      <Shell />
    </MotionProvider>
  );
}
