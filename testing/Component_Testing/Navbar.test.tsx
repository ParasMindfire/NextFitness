import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, test } from 'vitest';
import Navbar from '../../components/Navbar';
import { useRouter } from 'next/navigation';
import { useUserStore } from '../../app/store/useUserStore';

// Mock useRouter from next/navigation
const mockPush = vi.fn();
const mockReplace = vi.fn();
const mockPrefetch = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
    prefetch: mockPrefetch,
  }),
}));

// Mock useUserStore
const mockSetUser = vi.fn();
vi.mock('../../app/store/useUserStore', () => ({
  useUserStore: vi.fn(), // Use vi.fn() to allow dynamic returns
}));

describe('Navbar Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders the navbar title correctly', () => {
    (useUserStore as jest.Mock).mockReturnValue({
      user: null,
      setUser: mockSetUser,
    });

    render(<Navbar />);
    expect(screen.getByText('Fitness Tracker')).toBeInTheDocument();
  });

  it('renders the workouts dropdown correctly when toggled', () => {
    (useUserStore as jest.Mock).mockReturnValue({
      user: { name: 'Test User' },
      setUser: mockSetUser,
    });

    render(<Navbar />);

    fireEvent.click(screen.getByText('Workouts'));

    expect(screen.getByText('View Workouts')).toBeInTheDocument();
    expect(screen.getByText('Add Workout')).toBeInTheDocument();
  });
});
