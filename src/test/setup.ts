import "@testing-library/jest-dom";
import { vi } from "vitest";
// Add any global test setup here

// Configure Testing Library to also check for data-test-id attribute
import { configure } from "@testing-library/react";

vi.mock("@/hooks/useTypingText", () => ({
  useTypingText: vi.fn(({ text }) => {
    return { text, isTyping: false };
  }),
}));

configure({
  testIdAttribute: "data-test-id",
});
