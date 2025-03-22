import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ChatContainer } from "./ChatContainer";
import type { Message } from "./types";

describe("ChatContainer", () => {
  it("renders messages and chat input", () => {
    const messages: Message[] = [
      { id: "1", content: "Hello", isUser: false },
      { id: "2", content: "Hi there!", isUser: true },
    ];

    const handleSubmit = vi.fn();
    const setInput = vi.fn();

    render(
      <ChatContainer
        messages={messages}
        isLoading={false}
        input=""
        setInput={setInput}
        handleSubmit={handleSubmit}
      />,
    );

    // Check both messages are displayed
    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByText("Hi there!")).toBeInTheDocument();

    // Check avatars
    expect(screen.getByText("AI")).toBeInTheDocument();
    expect(screen.getByText("ME")).toBeInTheDocument();

    // Check input form exists
    expect(
      screen.getByPlaceholderText("Type your message..."),
    ).toBeInTheDocument();
  });

  it("displays typing indicator when loading", () => {
    const messages: Message[] = [{ id: "1", content: "Hello", isUser: false }];

    const handleSubmit = vi.fn();
    const setInput = vi.fn();

    render(
      <ChatContainer
        messages={messages}
        isLoading={true}
        input=""
        setInput={setInput}
        handleSubmit={handleSubmit}
      />,
    );

    // Check message is displayed
    expect(screen.getByText("Hello")).toBeInTheDocument();

    // Check typing indicator (there should be two AI avatars - one for the message, one for typing)
    const aiAvatars = screen.getAllByText("AI");
    expect(aiAvatars.length).toBe(2);

    // Check animation dots are displayed
    const dots = document.querySelectorAll(".animate-bounce");
    expect(dots.length).toBe(3);
  });
});
