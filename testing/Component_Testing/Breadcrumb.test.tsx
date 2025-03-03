import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Breadcrumbs from '../../components/BreadCrumb';
import { usePathname } from 'next/navigation';

// Mock usePathname from next/navigation
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

describe('Breadcrumbs Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the home link correctly', () => {
    // Mock the pathname to be the root
    (usePathname as jest.Mock).mockReturnValue('/');

    render(<Breadcrumbs />);
    expect(screen.getAllByText('Home')[0]).toBeInTheDocument();
  });

  it('renders breadcrumbs for a nested path', () => {
    // Mock the pathname to be a nested route
    (usePathname as jest.Mock).mockReturnValue('/workoutFormPage');

    render(<Breadcrumbs />);

    // Check if the breadcrumbs are rendered correctly
    expect(screen.getAllByText('Home')[0]).toBeInTheDocument();
    expect(screen.getByText('Workout Form')).toBeInTheDocument();
  });

  it('renders breadcrumbs for a deep nested path', () => {
    // Mock the pathname to be a deep nested route
    (usePathname as jest.Mock).mockReturnValue('/fitnessViews/calories');

    render(<Breadcrumbs />);

    // Check if the breadcrumbs are rendered correctly
    expect(screen.getAllByText('Home')[0]).toBeInTheDocument();
    expect(screen.getByText('Fitness Views')).toBeInTheDocument();
    expect(screen.getByText('Workout Calories')).toBeInTheDocument();
  });

  it('renders breadcrumbs for an unknown path', () => {
    // Mock the pathname to be an unknown route
    (usePathname as jest.Mock).mockReturnValue('/unknown/path');

    render(<Breadcrumbs />);

    // Check if the breadcrumbs are rendered correctly
    expect(screen.getAllByText('Home')[0]).toBeInTheDocument();
    expect(screen.getByText('unknown')).toBeInTheDocument();
    expect(screen.getByText('path')).toBeInTheDocument();
  });
});
