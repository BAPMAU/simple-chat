import type { Message } from "@/domain/entities/message";
import { Roles } from "@/domain/entities/roles.enum";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

interface WebhookResponse {
  output: string;
}

interface ChatWebhookOptions {
  webhookUrl?: string;
  simulationDelay?: number;
  initialMessages?: Message[];
}

const DEFAULT_OPTIONS: ChatWebhookOptions = {
  simulationDelay: 1500,
  // initialMessages: [
    { id: "1", content: "Hello! How can I help you today?", role: Roles.Chat },
  ],
};

/**
 * A flexible hook for handling chat webhook communication
 * Supports both real API calls and simulated responses
 */
export function useChatWebhook(options: ChatWebhookOptions = DEFAULT_OPTIONS) {
  const { webhookUrl, simulationDelay, initialMessages } = {
    ...DEFAULT_OPTIONS,
    ...options,
  };
  const [messages, setMessages] = useState<Message[]>(initialMessages || []);

  const sendMessageMutation = useMutation({
    mutationFn: async (content: string): Promise<WebhookResponse> => {
      if (!webhookUrl) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ output: `This is a simulated response: ${content}` });
          }, simulationDelay);
        });
      }

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: content }),
      });

      if (!response.ok) {
        throw new Error(`Webhook error: ${response.statusText}`);
      }

      return await response.json();
    },
    onSuccess: (data) => {
      const chatMessage = {
        id: Date.now().toString(),
        content: data.output,
        role: Roles.Chat,
      };

      setMessages((prevMessages: Message[]) => [...prevMessages, chatMessage]);
    },
    onError: () => {
      const errorMessage = {
        id: Date.now().toString(),
        content: "An error occurred. Please try again later.",
        role: Roles.Chat,
        isError: true,
      };

      setMessages((prevMessages: Message[]) => [...prevMessages, errorMessage]);
    },
  });

  // Function to send a message
  const sendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: Roles.User,
    };
    setMessages((prevMessages: Message[]) => [...prevMessages, userMessage]);

    if (!content.trim()) return;
    sendMessageMutation.mutate(content);
  };

  return {
    isLoading: sendMessageMutation.isPending,
    isError: sendMessageMutation.isError,
    sendMessage,
    messages,
  };
}
