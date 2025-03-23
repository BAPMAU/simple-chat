import type { Message } from "@/domain/entities/message";

interface ChatMessageProps {
  message: Message;
}

export const AssistantMessage = ({ message }: ChatMessageProps) => (
  <div className="flex justify-end" data-test-id="ai-message">
    <div className="flex items-end max-w-[80%] gap-3">
      <p
        className={`text-md leading-relaxed whitespace-pre-wrap ${
          message.isError ? "text-orange-700" : "text-primary"
        }`}
        data-test-id="message-content"
      >
        {message.isError ? `❌ ${message.content}` : message.content}
      </p>
    </div>
  </div>
);
