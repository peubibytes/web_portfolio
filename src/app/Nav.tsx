import { useCallback, useState } from 'react';
import { SECTIONS } from './sections';
import { profile } from '../content/profile';
import { useActiveSection } from '../hooks/useActiveSection';
import { MobileMenu } from './MobileMenu';

export function Nav() {
  const active = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const onDark = active === 'experiencias' && !menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        onDark ? 'on-dark border-paper/15 bg-plate-dark/92 text-paper' : 'border-ink/15 bg-plate/92 text-ink'
      }`}
    >
      <nav aria-label="Principal" className="relative z-[46] mx-auto flex max-w-[88rem] items-center justify-between px-4 py-3.5 md:px-10">
        <a href="#inicio" className="font-display text-sm font-medium tracking-tight">
          {profile.name}
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {SECTIONS.slice(1).map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={active === s.id ? 'true' : undefined}
                className={`flex items-baseline gap-1.5 border-b pb-0.5 font-serif text-[1.05rem] transition-colors ${
                  active === s.id ? 'border-sodium' : 'border-transparent hover:border-current/40'
                }`}
              >
                <span className="label">{s.numeral}</span>
                {s.nav}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="font-mono text-sm underline decoration-current/40 underline-offset-4 md:hidden"
        >
          {menuOpen ? 'fechar' : 'índice'}
        </button>
      </nav>
      <MobileMenu open={menuOpen} active={active} onClose={closeMenu} />
    </header>
  );
}
