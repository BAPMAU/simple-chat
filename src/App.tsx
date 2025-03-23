import { ChatContainer } from "@/components/chat/ChatContainer";
import { useChatWebhook } from "@/hooks/useChatWebhook";
import { useState } from "react";

function App() {
  const { messages, isLoading, sendMessage } = useChatWebhook({
    webhookUrl: import.meta.env.VITE_WEBHOOK_URL,
  });
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userInput = input;
    setInput("");
    sendMessage(userInput);
  };

  return (
    <div
      className="min-h-screen bg-background flex flex-col"
      data-test-id="app-container"
    >
      <div
        className="flex items-center justify-center p-4 border-b fixed w-full mx-auto z-50 bg-accent"
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
        className="flex-1 flex flex-col max-w-5xl mx-auto w-full p-4 z-0 m-10"
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
