import { Hero } from '../features/hero/Hero';
import { About } from '../features/about/About';
import { Skills } from '../features/skills/Skills';
import { Experience } from '../features/experience/Experience';
import { Projects } from '../features/projects/Projects';
import { Contact } from '../features/contact/Contact';
import { profile } from '../content/profile';
import { useActiveSection } from '../hooks/useActiveSection';
import { MotionProvider, useMotion } from '../hooks/useMotion';
import { Reticle } from '../components/hud/Reticle';

function Shell() {
  const active = useActiveSection();
  const { animate, toggle } = useMotion();
  const repo = profile.links.find((l) => l.kind === 'github');

  return (
    <div className={animate ? '' : 'no-motion'}>
      <Reticle />

      <main id="main" tabIndex={-1} className="pb-24 outline-none md:pb-0">
        <Hero />
        <About />
        <Skills />
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
        <p className="hud flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-t border-line pt-4 text-text-3">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <button
            type="button"
            onClick={toggle}
            aria-pressed={animate}
            aria-label="Movimento"
            className="hud min-h-9 whitespace-nowrap border border-edge px-2.5 text-text-2 hover:text-text"
          >
            Mov · {animate ? 'on' : 'off'}
          </button>
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
