import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProjectSheet } from '../features/projects/ProjectSheet';
import { MobileMenu } from '../app/MobileMenu';
import { Contact } from '../features/contact/Contact';
import { projects } from '../content/projects';

describe('ProjectSheet', () => {
  it('é um diálogo acessível, mostra a lição e fecha com ESC', async () => {
    const onClose = vi.fn();
    render(<ProjectSheet project={projects[0]!} index={0} onClose={onClose} />);
    expect(screen.getByRole('dialog', { name: projects[0]!.title })).toBeInTheDocument();
    expect(screen.getByText('O que eu faria diferente')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'fechar (esc)' })).toHaveFocus();
    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();
  });
});

describe('MobileMenu', () => {
  it('lista as seções com o termo comum, marca a ativa e fecha com ESC', async () => {
    const onClose = vi.fn();
    render(<MobileMenu open active="projetos" onClose={onClose} />);
    expect(screen.getByRole('dialog', { name: 'Índice' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Carta de objetos/ })).toHaveAttribute('aria-current', 'true');
    expect(screen.getByText('projetos selecionados')).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();
  });
});

describe('Contact', () => {
  it('exige nome e mensagem antes de montar o email', () => {
    render(<Contact />);
    expect(screen.getByRole('textbox', { name: 'Seu nome' })).toBeRequired();
    expect(screen.getByRole('textbox', { name: 'Mensagem' })).toBeRequired();
    expect(screen.getByRole('button', { name: 'Escrever email' })).toBeInTheDocument();
  });
});
