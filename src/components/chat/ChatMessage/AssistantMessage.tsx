import type { Message } from "@/domain/entities/message";
import { useTypingText } from "@/hooks/useTypingText";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

interface ChatMessageProps {
  message: Message;
}

export const AssistantMessage = ({ message }: ChatMessageProps) => {
  const content = message.isError ? `❌ ${message.content}` : message.content;

  const { text, isTyping } = useTypingText({
    text: content,
    speed: 1,
  });

  return (
    <div className="flex justify-end" data-test-id="ai-message">
      <div className="flex items-end gap-3">
        <div
          className={`prose text-md ${
            message.isError ? "text-orange-700" : "text-primary"
          }`}
          data-test-id="message-content"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, ref, style, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                console.log(style);
                return match ? (
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    className="rounded-md my-2"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <div className="bg-muted rounded-md p-4 my-2 overflow-auto">
                    <code className="text-sm" {...props}>
                      {children}
                    </code>
                  </div>
                );
              },
              a({ node, className, children, ...props }) {
                return (
                  <a
                    className="text-primary underline hover:text-primary/90 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                  >
                    {children}
                  </a>
                );
              },
            }}
          >
            {text}
          </ReactMarkdown>
          {isTyping && (
            <span className="text-primary animate-pulse" aria-label="Typing">
              ...
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
