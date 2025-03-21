import { ChatContainer } from "@/components/chat/ChatContainer";
import type { Message } from "@/components/chat/types";
import { useState } from "react";

function App() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", content: "Hello! How can I help you today?", isUser: false },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
    };

    const userInput = input;
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response with typing effect
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `I received your message: "${userInput}"`,
        isUser: false,
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div
      className="min-h-screen bg-background flex flex-col"
      data-test-id="app-container"
    >
      <div
        className="flex items-center justify-center p-4 border-b"
        data-test-id="header"
      >
        <h1
          className="text-xl font-bold text-foreground"
          data-test-id="app-title"
        >
          Simple Chat
        </h1>
      </div>

      <div
        className="flex-1 flex flex-col max-w-5xl mx-auto w-full p-4"
        data-test-id="main-container"
      >
        <ChatContainer
          messages={messages}
          isLoading={isLoading}
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default App;
