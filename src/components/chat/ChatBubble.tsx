import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Message } from "./types";

interface ChatBubbleProps {
  message: Message;
}

export function ChatBubble({ message }: ChatBubbleProps) {
  return (
    <div
      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
      data-test-id={message.isUser ? 'user-message' : 'ai-message'}
    >
      <div className="flex items-start max-w-[80%] gap-3">
        {!message.isUser && (
          <Avatar className="mt-0.5 h-8 w-8" data-test-id="ai-avatar">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">AI</AvatarFallback>
          </Avatar>
        )}

        <div
          className={`px-4 py-2.5 rounded-2xl ${
            message.isUser
              ? 'bg-primary text-primary-foreground rounded-tr-none'
              : 'bg-muted text-muted-foreground rounded-tl-none'
          }`}
          data-test-id="message-bubble"
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap" data-test-id="message-content">
            {message.content}
          </p>
        </div>

        {message.isUser && (
          <Avatar className="mt-0.5 h-8 w-8" data-test-id="user-avatar">
            <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">ME</AvatarFallback>
          </Avatar>
        )}
      </div>
    </div>
  );
}
