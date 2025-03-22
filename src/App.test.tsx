import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";

// Mock scrollIntoView
Element.prototype.scrollIntoView = vi.fn();

describe("App", () => {
  beforeEach(() => {
    // Mock setTimeout
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the chat interface with initial AI message", () => {
    render(<App />);

    // Check header
    expect(screen.getByText("Simple Chat")).toBeInTheDocument();

    // Check initial AI message
    expect(
      screen.getByText("Hello! How can I help you today?"),
    ).toBeInTheDocument();

    // Check input form
    expect(
      screen.getByPlaceholderText("Type your message..."),
    ).toBeInTheDocument();
  });

  it("sends user message and shows loading state", async () => {
    render(<App />);

    // Type a message
    const textarea = screen.getByPlaceholderText("Type your message...");
    fireEvent.change(textarea, { target: { value: "Hello AI!" } });

    // Submit the form
    const submitButton = screen.getByRole("button");
    fireEvent.click(submitButton);

    // Check user message is displayed
    expect(screen.getByText("Hello AI!")).toBeInTheDocument();

    // Check loading indicator appears
    const dots = document.querySelectorAll(".animate-bounce");
    expect(dots.length).toBe(3);
  });

  it("shows AI response after loading", async () => {
    render(<App />);

    // Type and send a message
    const textarea = screen.getByPlaceholderText("Type your message...");
    fireEvent.change(textarea, { target: { value: "Hello AI!" } });

    const submitButton = screen.getByRole("button");
    fireEvent.click(submitButton);

    // Fast-forward timers
    act(() => {
      vi.advanceTimersByTime(1500);
    });

    // Check AI response appears
    expect(
      screen.getByText('I received your message: "Hello AI!"'),
    ).toBeInTheDocument();

    // Check loading indicator is gone
    const dots = document.querySelectorAll(".animate-bounce");
    expect(dots.length).toBe(0);
  });
});
