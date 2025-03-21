import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ResizeObserver } from "@juggle/resize-observer";
import { useEffect, useRef, useState } from "react";

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

  // Calculate the input height for the bottom padding of the scroll area
  const [inputHeight, setInputHeight] = useState(64); // Default height (48px + 16px padding)
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateInputHeight = () => {
      if (inputRef.current) {
        setInputHeight(inputRef.current.offsetHeight);
      }
    };

    updateInputHeight();
    const resizeObserver = new ResizeObserver(updateInputHeight);
    if (inputRef.current) {
      resizeObserver.observe(inputRef.current);
    }

    return () => {
      if (inputRef.current) {
        resizeObserver.disconnect();
      }
    };
  }, []);

  return (
    <Card
      className="flex-1 flex flex-col shadow-md relative h-screen"
      data-test-id="chat-container"
    >
      <div
        ref={scrollAreaRef}
        className="flex-1 absolute inset-0 bottom-0"
        data-test-id="scroll-container"
      >
        <ScrollArea className="h-full">
          <CardContent
            className="p-6 space-y-6"
            style={{ paddingBottom: `${inputHeight + 16}px` }}
            data-test-id="messages-container"
          >
            {messages.map((message) => (
              <ChatBubble key={message.id} message={message} />
            ))}

            {isLoading && <TypingIndicator />}
          </CardContent>
        </ScrollArea>
      </div>

      <div
        ref={inputRef}
        className="absolute bottom-0 left-0 right-0 bg-card z-10"
        data-test-id="chat-footer"
      >
        <Separator />
        <CardFooter className="p-4">
          <ChatInput
            input={input}
            setInput={setInput}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </CardFooter>
      </div>
    </Card>
  );
}
