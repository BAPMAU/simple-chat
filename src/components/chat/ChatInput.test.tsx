import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ChatInput } from './ChatInput';

describe('ChatInput', () => {
  it('renders the textarea and submit button', () => {
    const handleSubmit = vi.fn();
    const setInput = vi.fn();

    render(
      <ChatInput
        input="Hello" // Use non-empty input to enable button
        setInput={setInput}
        handleSubmit={handleSubmit}
        isLoading={false}
      />
    );

    // Check textarea exists
    const textarea = screen.getByTestId('chat-input');
    expect(textarea).toBeInTheDocument();

    // Check submit button exists with send icon
    const submitButton = screen.getByTestId('chat-submit-button');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).not.toBeDisabled();
  });

  it('disables submit button when input is empty', () => {
    const handleSubmit = vi.fn();
    const setInput = vi.fn();

    render(
      <ChatInput
        input=""
        setInput={setInput}
        handleSubmit={handleSubmit}
        isLoading={false}
      />
    );

    const submitButton = screen.getByTestId('chat-submit-button');
    expect(submitButton).toBeDisabled();
  });

  it('disables submit button when loading', () => {
    const handleSubmit = vi.fn();
    const setInput = vi.fn();

    render(
      <ChatInput
        input="Hello"
        setInput={setInput}
        handleSubmit={handleSubmit}
        isLoading={true}
      />
    );

    const submitButton = screen.getByTestId('chat-submit-button');
    expect(submitButton).toBeDisabled();
  });

  it('calls setInput when typing in textarea', () => {
    const handleSubmit = vi.fn();
    const setInput = vi.fn();

    render(
      <ChatInput
        input=""
        setInput={setInput}
        handleSubmit={handleSubmit}
        isLoading={false}
      />
    );

    const textarea = screen.getByTestId('chat-input');
    fireEvent.change(textarea, { target: { value: 'Hello' } });

    expect(setInput).toHaveBeenCalledWith('Hello');
  });

  it('calls handleSubmit when form is submitted', () => {
    const handleSubmit = vi.fn();
    const setInput = vi.fn();

    render(
      <ChatInput
        input="Hello"
        setInput={setInput}
        handleSubmit={handleSubmit}
        isLoading={false}
      />
    );

    const form = screen.getByTestId('chat-form');

    // Simulate form submission
    fireEvent.submit(form);

    // Check if the handleSubmit function was called
    expect(handleSubmit).toHaveBeenCalled();
  });

  it('does not call handleSubmit when pressing Shift+Enter', () => {
    const handleSubmit = vi.fn();
    const setInput = vi.fn();
    const preventDefaultMock = vi.fn();

    render(
      <ChatInput
        input="Hello"
        setInput={setInput}
        handleSubmit={handleSubmit}
        isLoading={false}
      />
    );

    const textarea = screen.getByTestId('chat-input');
    fireEvent.keyDown(textarea, {
      key: 'Enter',
      shiftKey: true,
      preventDefault: preventDefaultMock
    });

    expect(preventDefaultMock).not.toHaveBeenCalled();
    expect(handleSubmit).not.toHaveBeenCalled();
  });
});
