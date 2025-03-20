import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TypingIndicator } from './TypingIndicator';

describe('TypingIndicator', () => {
  it('renders the typing indicator with AI avatar', () => {
    render(<TypingIndicator />);

    // Check AI avatar is displayed with correct initials
    expect(screen.getByText('AI')).toBeInTheDocument();

    // Check the animation dots are displayed
    const dots = document.querySelectorAll('.animate-bounce');
    expect(dots.length).toBe(3);

    // Check styling
    const bubbleContainer = document.querySelector('.rounded-2xl');
    expect(bubbleContainer).toHaveClass('bg-muted');
    expect(bubbleContainer).toHaveClass('rounded-tl-none');
  });
});
