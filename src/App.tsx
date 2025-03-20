import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SendIcon } from "lucide-react"

type Message = {
  id: string;
  content: string;
  isUser: boolean;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', content: 'Hello! How can I help you today?', isUser: false }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isUser: true
    };

    const userInput = input;
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response with typing effect
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `I received your message: "${userInput}"`,
        isUser: false
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex items-center justify-center p-4 border-b">
        <h1 className="text-xl font-bold text-foreground">Simple Chat</h1>
      </div>

      <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full p-4">
        <Card className="flex-1 flex flex-col shadow-md">
          <div ref={scrollAreaRef} className="flex-1">
            <ScrollArea className="h-[calc(100vh-220px)]">
              <CardContent className="p-6 space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="flex items-start max-w-[80%] gap-3">
                      {!message.isUser && (
                        <Avatar className="mt-0.5 h-8 w-8">
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs">AI</AvatarFallback>
                        </Avatar>
                      )}

                      <div
                        className={`px-4 py-2.5 rounded-2xl ${
                          message.isUser
                            ? 'bg-primary text-primary-foreground rounded-tr-none'
                            : 'bg-muted text-muted-foreground rounded-tl-none'
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                          {message.content}
                        </p>
                      </div>

                      {message.isUser && (
                        <Avatar className="mt-0.5 h-8 w-8">
                          <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">ME</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-start max-w-[80%] gap-3">
                      <Avatar className="mt-0.5 h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">AI</AvatarFallback>
                      </Avatar>
                      <div className="px-4 py-3 rounded-2xl bg-muted text-muted-foreground rounded-tl-none">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:0.1s]" />
                          <div className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:0.2s]" />
                          <div className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:0.3s]" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </ScrollArea>
          </div>

          <Separator />

          <CardFooter className="p-4">
            <form onSubmit={handleSubmit} className="flex w-full gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="min-h-12 resize-none flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input.trim()}
              >
                <SendIcon className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default App
