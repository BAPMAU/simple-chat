import type { Message } from "@/domain/entities/message";
import { Roles } from "@/domain/entities/roles.enum";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ChatMessage } from ".";

describe("ChatMessage", () => {
  it("renders user message correctly", () => {
    const userMessage: Message = {
      id: "1",
      content: "Hello, this is a test message",
      role: Roles.User,
    };

    render(<ChatMessage message={userMessage} />);

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

  it("renders assistant message correctly", () => {
    const assistantMessage: Message = {
      id: "2",
      content: "Hello, I am the AI assistant",
      role: Roles.Chat,
    };

    render(<ChatMessage message={assistantMessage} />);

    // Check message content is displayed
    expect(
      screen.getByText("Hello, I am the AI assistant"),
    ).toBeInTheDocument();
  });

  it("renders error message correctly", () => {
    const errorMessage: Message = {
      id: "3",
      content: "An error occurred",
      role: Roles.Chat,
      isError: true,
    };

    render(<ChatMessage message={errorMessage} />);

    // Check error message content is displayed with error icon
    expect(screen.getByText("❌ An error occurred")).toBeInTheDocument();

    // Verify error message has the correct text color
    const messageElement = screen.getByText("❌ An error occurred");
    expect(messageElement.parentElement).toHaveClass("text-orange-700");
  });
});
