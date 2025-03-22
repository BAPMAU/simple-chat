import type { Message } from "@/domain/entities/message";
import { Roles } from "@/domain/entities/roles.enum";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ChatBubble } from "./ChatBubble";

describe("ChatBubble", () => {
  it("renders user message correctly", () => {
    const userMessage: Message = {
      id: "1",
      content: "Hello, this is a test message",
      role: Roles.User,
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
      role: Roles.Chat,
    };

    render(<ChatBubble message={aiMessage} />);

    // Check message content is displayed
    expect(
      screen.getByText("Hello, I am the AI assistant"),
    ).toBeInTheDocument();
  });
});
