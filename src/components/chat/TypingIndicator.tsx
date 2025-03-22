export function TypingIndicator() {
  return (
    <div className="flex justify-end" data-test-id="typing-indicator">
      <div className="flex items-end max-w-[80%] gap-3">
        <div
          className="px-4 py-3 rounded-2xl bg-muted text-muted-foreground"
          data-test-id="typing-bubble"
        >
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
