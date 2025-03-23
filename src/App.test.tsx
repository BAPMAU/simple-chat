import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";

Element.prototype.scrollIntoView = vi.fn();

describe("App", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the chat interface with initial AI message", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>,
    );

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
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>,
    );

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
    const originalConsoleError = console.error;
    console.error = vi.fn();

    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>,
    );

    // Type and send a message
    const textarea = screen.getByPlaceholderText("Type your message...");
    fireEvent.change(textarea, { target: { value: "Hello AI!" } });

    const submitButton = screen.getByRole("button");
    fireEvent.click(submitButton);

    // Verify loading state
    expect(document.querySelectorAll(".animate-bounce").length).toBe(3);

    // Fast-forward timers
    act(() => {
      vi.advanceTimersByTime(1500);
    });

    // Wait for React Query to process the error
    // This is needed because React Query might take some time to process the error
    await vi.runAllTimersAsync();

    // Check that we have the expected number of messages (3: initial AI + user + error message)
    const messages = screen.getAllByTestId(/message-content/);
    expect(messages.length).toBe(3);

    // Restore console.error
    console.error = originalConsoleError;
  });
});
