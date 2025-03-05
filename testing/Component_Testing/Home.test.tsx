import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Landing from '../../app/(home)/Landing';
import { useUserStore } from '../../app/store/useUserStore';

// Mock useUserStore
const mockUser = { name: 'Test User' };
vi.mock('../../app/store/useUserStore', () => ({
  useUserStore: vi.fn(),
}));

describe('Landing Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the landing page for logged-in users', () => {
    (useUserStore as any).mockReturnValue({ user: mockUser });

    render(<Landing />);

    expect(screen.getByText('Goals Added World Wide')).toBeInTheDocument();
    expect(screen.getByText('Chat with AI')).toBeInTheDocument();

    // Use getAllByText to find all matching elements
    const aiMessages = screen.getAllByText((content:any, element:any) => {
      return element?.textContent?.includes('AI: Hi there! How can I assist you today?');
    });
    expect(aiMessages.length).toBeGreaterThan(0);
  });

  it('renders the landing page for non-logged-in users', () => {
    (useUserStore as any).mockReturnValue({ user: null });

    render(<Landing />);

    expect(screen.getByText('NAVBAR TITLE')).toBeInTheDocument();
    expect(screen.getByText('PERSONAL TRACKER')).toBeInTheDocument();
    expect(screen.getByText('SIGNUP')).toBeInTheDocument();
    expect(screen.getByText('LOGIN')).toBeInTheDocument();
  });

  it('handles empty messages gracefully', () => {
    (useUserStore as any).mockReturnValue({ user: mockUser });

    render(<Landing />);

    // Try to send an empty message
    fireEvent.click(screen.getAllByText('Send')[0]);

    // Check that no new message is added
    expect(screen.queryByText('You:')).not.toBeInTheDocument();
  });
});
