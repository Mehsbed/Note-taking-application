'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-2xl bg-[var(--bg-secondary)] hover:bg-opacity-80 transition-all duration-300 ease-in-out border border-[var(--border-color)]"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon size={20} className="text-[var(--text-primary)]" />
      ) : (
        <Sun size={20} className="text-[var(--text-primary)]" />
      )}
    </button>
  );
}
