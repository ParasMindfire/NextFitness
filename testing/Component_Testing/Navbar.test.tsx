// testing/Component_Testing/Navbar.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Navbar from '../../components/Navbar';
import { useRouter } from 'next/navigation';

// Mock useRouter from next/navigation
vi.mock('next/navigation', () => ({
  useRouter: vi.fn().mockReturnValue({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

describe('Navbar Component', () => {
  it('renders the navbar title correctly', () => {
    render(<Navbar />);
    expect(screen.getByText('Fitness Tracker')).toBeInTheDocument(); // Updated text
  });
});