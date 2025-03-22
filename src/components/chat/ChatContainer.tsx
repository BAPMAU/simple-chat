import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useEffect, useRef } from "react";
import { ChatBubble } from "./ChatBubble";
import { ChatInput } from "./ChatInput";
import { TypingIndicator } from "./TypingIndicator";
import type { Message } from "./types";

interface ChatContainerProps {
  messages: Message[];
  isLoading: boolean;
  input: string;
  setInput: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export function ChatContainer({
  messages,
  isLoading,
  input,
  setInput,
  handleSubmit,
}: ChatContainerProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]",
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  });

  return (
    <Card
      className="flex-1 flex flex-col shadow-md"
      data-test-id="chat-container"
    >
      <div
        ref={scrollAreaRef}
        className="flex-1"
        data-test-id="scroll-container"
      >
        <ScrollArea className="h-[calc(100vh-220px)]">
          <CardContent
            className="p-6 space-y-6"
            data-test-id="messages-container"
          >
            {messages.map((message) => (
              <ChatBubble key={message.id} message={message} />
            ))}

            {isLoading && <TypingIndicator />}
          </CardContent>
        </ScrollArea>
      </div>

      <Separator />

      <CardFooter className="p-4" data-test-id="chat-footer">
        <ChatInput
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </CardFooter>
    </Card>
  );
}
