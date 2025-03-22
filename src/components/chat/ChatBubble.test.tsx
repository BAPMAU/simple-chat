import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ChatBubble } from "./ChatBubble";
import type { Message } from "./types";

describe("ChatBubble", () => {
  it("renders user message correctly", () => {
    const userMessage: Message = {
      id: "1",
      content: "Hello, this is a test message",
      isUser: true,
    };

    render(<ChatBubble message={userMessage} />);

    // Check message content is displayed
    expect(
      screen.getByText("Hello, this is a test message"),
    ).toBeInTheDocument();

    // Check user avatar is displayed with correct initials
    expect(screen.getByText("ME")).toBeInTheDocument();

    // Verify message has the correct styling (user messages have primary background)
    const messageElement = screen
      .getByText("Hello, this is a test message")
      .closest("div");
    expect(messageElement).toHaveClass("bg-primary");
    expect(messageElement).toHaveClass("rounded-tr-none");
  });

  it("renders AI message correctly", () => {
    const aiMessage: Message = {
      id: "2",
      content: "Hello, I am the AI assistant",
      isUser: false,
    };

    render(<ChatBubble message={aiMessage} />);

    // Check message content is displayed
    expect(
      screen.getByText("Hello, I am the AI assistant"),
    ).toBeInTheDocument();

    // Check AI avatar is displayed with correct initials
    expect(screen.getByText("AI")).toBeInTheDocument();

    // Verify message has the correct styling (AI messages have muted background)
    const messageElement = screen
      .getByText("Hello, I am the AI assistant")
      .closest("div");
    expect(messageElement).toHaveClass("bg-muted");
    expect(messageElement).toHaveClass("rounded-tl-none");
  });
});
