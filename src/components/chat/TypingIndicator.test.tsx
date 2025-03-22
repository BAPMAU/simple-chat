import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TypingIndicator } from "./TypingIndicator";

describe("TypingIndicator", () => {
  it("renders the typing indicator with AI avatar", () => {
    render(<TypingIndicator />);

    // Check the animation dots are displayed
    const dots = document.querySelectorAll(".animate-bounce");
    expect(dots.length).toBe(3);

    // Check styling
    const bubbleContainer = document.querySelector(".rounded-2xl");
    expect(bubbleContainer).toHaveClass("bg-muted");
  });
});
