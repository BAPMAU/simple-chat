import "@testing-library/jest-dom";

// Add any global test setup here

// Configure Testing Library to also check for data-test-id attribute
import { configure } from "@testing-library/react";

configure({
  testIdAttribute: "data-test-id",
});
