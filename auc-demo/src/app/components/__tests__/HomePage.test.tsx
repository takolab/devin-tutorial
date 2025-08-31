import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from '../../page';

vi.mock('../../components/Header', () => ({
  default: () => <div data-testid="header">AucDemo Header</div>,
}));

vi.mock('../../components/HomeContent', () => ({
  default: () => (
    <div data-testid="home-content">
      <div>Toyota C-HR</div>
      <div>Honda Fit</div>
      <button>View Details</button>
      <button>View Details</button>
    </div>
  ),
}));

describe('HomePage', () => {
  it('renders home page structure', () => {
    render(<HomePage />);
    
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('home-content')).toBeInTheDocument();
  });

  it('displays car information', () => {
    render(<HomePage />);
    
    expect(screen.getByText('Toyota C-HR')).toBeInTheDocument();
    expect(screen.getByText('Honda Fit')).toBeInTheDocument();
  });

  it('shows view details buttons', () => {
    render(<HomePage />);
    
    const viewDetailsButtons = screen.getAllByText('View Details');
    expect(viewDetailsButtons).toHaveLength(2);
  });
});
