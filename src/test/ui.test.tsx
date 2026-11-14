import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FilePanel } from '../features/projects/FilePanel';
import { Contact } from '../features/contact/Contact';
import { projects } from '../content/projects';

describe('FilePanel', () => {
  it('é um diálogo acessível, mostra a origem e a lição (quando houver) e fecha com ESC', async () => {
    const onClose = vi.fn();
    const project = { ...projects[0]!, lesson: 'Uma lição com mais de vinte caracteres.' };
    render(<FilePanel project={project} index={0} onClose={onClose} />);
    expect(screen.getByRole('dialog', { name: projects[0]!.title })).toBeInTheDocument();
    expect(screen.getByText('O que eu faria diferente')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /GitHub/ })).toHaveAttribute('href', projects[0]!.links.repo);
    expect(screen.getByRole('button', { name: 'fechar (esc)' })).toHaveFocus();
    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();
  });
});

describe('Contact', () => {
  it('não tem cabeçalho de transmissão nem barra de espera', () => {
    render(<Contact />);
    expect(screen.queryByText(/transmi/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
  it('exige nome e mensagem antes de montar o email', () => {
    render(<Contact />);
    expect(screen.getByRole('textbox', { name: 'Seu nome' })).toBeRequired();
    expect(screen.getByRole('textbox', { name: 'Mensagem' })).toBeRequired();
    expect(screen.getByRole('button', { name: /escrever email/i })).toBeInTheDocument();
  });
});
