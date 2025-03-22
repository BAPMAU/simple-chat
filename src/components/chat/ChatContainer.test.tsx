import type { Message } from "@/domain/entities/message";
import { Roles } from "@/domain/entities/roles.enum";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ChatContainer } from "./ChatContainer";

describe("ChatContainer", () => {
  beforeEach(() => {
    Element.prototype.scrollIntoView = vi.fn();
  });

  it("renders messages and chat input", () => {
    const messages: Message[] = [
      { id: "1", content: "Hello", role: Roles.Chat },
      { id: "2", content: "Hi there!", role: Roles.User },
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

    // Check user avatar only (AI avatar not in current implementation)
    expect(screen.getByText("ME")).toBeInTheDocument();

    // Check input form exists
    expect(
      screen.getByPlaceholderText("Type your message..."),
    ).toBeInTheDocument();
  });

  it("displays typing indicator when loading", () => {
    const messages: Message[] = [
      { id: "1", content: "Hello", role: Roles.Chat },
    ];

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

    // Check typing indicator is present
    expect(screen.getByTestId("typing-indicator")).toBeInTheDocument();

    // Check animation dots are displayed
    const dots = document.querySelectorAll(".animate-bounce");
    expect(dots.length).toBe(3);
  });
});
