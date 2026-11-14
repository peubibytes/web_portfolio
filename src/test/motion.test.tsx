import { render, screen } from '@testing-library/react';
import { MotionProvider } from '../hooks/useMotion';
import { Hero } from '../features/hero/Hero';
import { DecodeText } from '../components/hud/DecodeText';

function mockReducedMotion(reduce: boolean) {
  window.matchMedia = ((query: string) =>
    ({
      matches: reduce && query.includes('prefers-reduced-motion'),
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    }) as unknown as MediaQueryList) as typeof window.matchMedia;
}

describe('prefers-reduced-motion', () => {
  it('mostra o título no primeiro frame, sem log nem botão de pular', () => {
    mockReducedMotion(true);
    render(
      <MotionProvider>
        <Hero />
      </MotionProvider>,
    );
    expect(screen.getByRole('heading', { level: 1, name: 'Pedro Barretto' })).toBeInTheDocument();
    expect(screen.queryByText(/alvo travado/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /pular conexão/i })).not.toBeInTheDocument();
  });

  it('o texto decodificado já nasce no valor final', () => {
    mockReducedMotion(true);
    render(
      <MotionProvider>
        <DecodeText text="Perfil" />
      </MotionProvider>,
    );
    expect(screen.getByText('Perfil', { selector: '.sr-only' })).toBeInTheDocument();
  });
});
