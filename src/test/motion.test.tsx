import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

afterEach(() => {
  sessionStorage.clear();
});

describe('prefers-reduced-motion', () => {
  it('mostra o log completo e nenhum botão de pular, desde o primeiro frame', () => {
    mockReducedMotion(true);
    render(
      <MotionProvider>
        <Hero />
      </MotionProvider>,
    );
    expect(screen.getByText('> alvo travado.')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /pular conexão/i })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: 'Pedro Barretto' })).toBeInTheDocument();
  });

  it('o texto decodificado já nasce no valor final', () => {
    mockReducedMotion(true);
    render(
      <MotionProvider>
        <DecodeText text="Varredura" />
      </MotionProvider>,
    );
    expect(screen.getByText('Varredura', { selector: '.sr-only' })).toBeInTheDocument();
  });
});

describe('boot', () => {
  it('com movimento, o botão pular existe e Esc completa o log', async () => {
    mockReducedMotion(false);
    render(
      <MotionProvider>
        <Hero />
      </MotionProvider>,
    );
    expect(screen.getByRole('button', { name: /pular conexão/i })).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
    expect(screen.getByText('> alvo travado.')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /pular conexão/i })).not.toBeInTheDocument();
  });
});
