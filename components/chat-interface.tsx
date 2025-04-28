"use client";

import { useEffect, useRef } from "react";
import ChatMessage from "@/components/chat-message";
import ChatInput from "@/components/ui/chat-input";
import { useChat } from "@/hooks/use-chat";

export default function ChatInterface() {
  const { messages, sendMessage, isLoading } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex h-screen flex-col">
      <header className="border-b border-gray-800 bg-gray-900 px-4 py-3 shadow-md">
        <h1 className="text-center text-xl font-bold text-white">Car Repair AI Assistant 🚗🔧</h1>
      </header>

      <div className="flex-1 overflow-y-auto bg-gray-950 p-4">
        <div className="mx-auto max-w-3xl space-y-4">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-gray-500">
              <p className="mt-2 text-lg">How can I help with your car today?</p>
              <p className="mt-1 text-sm">Describe your car problem or upload an image.</p>
            </div>
          ) : (
            messages.map((message, index) => (
              <ChatMessage
                key={index}
                content={message.content}
                isUser={message.role === "user"}
                timestamp={message.timestamp}
                image={message.image}
              />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t border-gray-800 bg-gray-900 p-4">
        <div className="mx-auto max-w-3xl">
          <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
