import { MotionConfig } from 'motion/react';
import { Hero } from '../features/hero/Hero';
import { About } from '../features/about/About';
import { Experience } from '../features/experience/Experience';
import { Projects } from '../features/projects/Projects';
import { Contact } from '../features/contact/Contact';
import { profile } from '../content/profile';
import { useActiveSection } from '../hooks/useActiveSection';
import { Nav } from './Nav';
import { PlateScale } from './PlateScale';

export function App() {
  const active = useActiveSection();
  const repo = profile.links.find((l) => l.kind === 'github');

  return (
    <MotionConfig reducedMotion="user">
      <Nav />
      <PlateScale active={active} />

      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>

      {/* rótulo de rodapé da placa: só informação real */}
      <footer className="mx-auto max-w-[88rem] px-4 pb-10 md:px-10">
        <p className="label flex flex-wrap justify-between gap-x-8 gap-y-2 border-t border-ink/20 pt-4">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span>digitalizada em {__BUILD_DATE__}</span>
          {repo && (
            <a href={repo.href} target="_blank" rel="noopener noreferrer" className="note-link">
              código-fonte
            </a>
          )}
        </p>
      </footer>
    </MotionConfig>
  );
}
