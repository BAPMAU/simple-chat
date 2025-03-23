import { CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ResizeObserver } from "@juggle/resize-observer";
import { useEffect, useRef, useState } from "react";

import type { Message } from "@/domain/entities/message";
import { ChatInput } from "./ChatInput";
import { ChatMessage } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";

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
  const scrollViewportRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Calculate the input height for the bottom padding of the scroll area
  const [inputHeight, setInputHeight] = useState(64); // Default height (48px + 16px padding)
  const inputRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    // Auto-scroll to bottom
    if (scrollViewportRef.current && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []); // Empty dependency array to satisfy the linter

  // This will trigger the scroll effect when messages change
  useEffect(() => {
    if (messages.length > 0) {
      // Auto-scroll to bottom
      if (scrollViewportRef.current && messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [messages.length]);

  // Scroll to bottom when sending a message (not while typing)
  const handleInputChange = (value: string) => {
    setInput(value);
  };

  // Update input height when it changes
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
    <div className="flex flex-col h-full" data-test-id="chat-container">
      {/* Chat messages area with scroll - positioned to start right after header */}
      <div className="flex-1 w-full overflow-hidden">
        <ScrollArea className="h-full w-full">
          <div
            className="flex flex-col w-full"
            ref={scrollViewportRef}
            data-test-id="scroll-container"
          >
            <CardContent
              className="p-6 space-y-6 min-h-[calc(100vh-10rem-80px)]"
              style={{ paddingBottom: `${inputHeight}px` }}
              data-test-id="messages-container"
            >
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}

              {isLoading && <TypingIndicator />}

              {/* Invisible element to scroll to */}
              <div ref={messagesEndRef} />
            </CardContent>
          </div>
        </ScrollArea>
      </div>

      {/* Fixed input area at the bottom */}
      <div
        ref={inputRef}
        className="fixed bottom-0 bg-card z-10 border-t w-full left-1/2 -translate-x-1/2 max-w-5xl"
        data-test-id="chat-footer"
      >
        <CardFooter className="p-4">
          <ChatInput
            input={input}
            setInput={handleInputChange}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </CardFooter>
      </div>
    </div>
  );
}
