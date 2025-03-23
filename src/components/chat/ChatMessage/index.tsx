import type { Message } from "@/domain/entities/message";
import { Roles } from "@/domain/entities/roles.enum";
import { AssistantMessage } from "./AssistantMessage";
import { UserBubble } from "./UserBubble";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return message.role === Roles.User ? (
    <UserBubble message={message} />
  ) : (
    <AssistantMessage message={message} />
  );
}
