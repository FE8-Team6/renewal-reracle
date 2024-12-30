import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { beforeEach, it, vi } from 'vitest';
import { describe, expect } from 'vitest';
import { Nav } from '@/components/Nav';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    BrowserRouter: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('Nav Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    render(
      <BrowserRouter>
        <Nav />
      </BrowserRouter>,
    );
  });

  it('모든 네비게이션 버튼이 렌더링됩니다.', () => {
    const navButtons = [
      { label: '홈으로 이동', path: '/' },
      { label: 'R지식in으로 이동', path: '/qna' },
      { label: '아티클로 이동', path: '/article' },
      { label: '공지로 이동', path: '/announcement' },
    ];

    navButtons.forEach(({ label }) => {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    });
  });

  it('각 버튼 클릭시 올바른 경로로 이동합니다.', async () => {
    const user = userEvent.setup();
    const navItems = [
      { path: '/', label: '홈으로 이동' },
      { path: '/qna', label: 'R지식in으로 이동' },
      { path: '/article', label: '아티클로 이동' },
      { path: '/announcement', label: '공지로 이동' },
    ];

    for (const { path, label } of navItems) {
      const button = screen.getByLabelText(label);
      await user.click(button);
      expect(mockNavigate).toHaveBeenCalledWith(path);
    }
  });

  it('모든 네이비게이션 버튼이 aria-label을 가집니다.', () => {
    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toHaveAttribute('aria-label');
      const label = button.getAttribute('aria-label');
      expect(label).not.toBe('');
      expect(label?.length).toBeGreaterThan(1);
    });

    expect(screen.getByRole('button', { name: '홈으로 이동' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'R지식in으로 이동' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '아티클로 이동' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '공지로 이동' })).toBeInTheDocument();
  });
});
