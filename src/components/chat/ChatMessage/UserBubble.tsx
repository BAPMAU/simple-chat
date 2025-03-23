import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Message } from "@/domain/entities/message";

interface UserBubbleProps {
  message: Message;
}

export const UserBubble = ({ message }: UserBubbleProps) => (
  <div className="flex justify-end" data-test-id="user-message">
    <div className="flex items-start max-w-[80%] gap-3">
      <div
        className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground rounded-tr-none"
        data-test-id="message-bubble"
      >
        <p
          className="text-sm leading-relaxed whitespace-pre-wrap"
          data-test-id="message-content"
        >
          {message.content}
        </p>
      </div>
      <Avatar className="mt-0.5 h-8 w-8" data-test-id="user-avatar">
        <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
          ME
        </AvatarFallback>
      </Avatar>
    </div>
  </div>
);
