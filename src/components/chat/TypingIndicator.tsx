import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function TypingIndicator() {
  return (
    <div className="flex justify-start" data-test-id="typing-indicator">
      <div className="flex items-start max-w-[80%] gap-3">
        <Avatar className="mt-0.5 h-8 w-8" data-test-id="ai-avatar">
          <AvatarFallback className="bg-primary text-primary-foreground text-xs">AI</AvatarFallback>
        </Avatar>
        <div className="px-4 py-3 rounded-2xl bg-muted text-muted-foreground rounded-tl-none" data-test-id="typing-bubble">
          <div className="flex gap-1" data-test-id="typing-dots">
            <div className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:0.1s]" />
            <div className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:0.2s]" />
            <div className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:0.3s]" />
          </div>
        </div>
      </div>
    </div>
  );
}
