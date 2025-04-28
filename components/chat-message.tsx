"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
  content: string;
  isUser: boolean;
  timestamp?: string;
  image?: string;
  isTyping?: boolean;
}

export default function ChatMessage({ content, isUser, timestamp, image, isTyping }: ChatMessageProps) {
  const [safeTimestamp, setSafeTimestamp] = useState<string | undefined>(undefined);

  useEffect(() => {
    setSafeTimestamp(timestamp);
  }, [timestamp]);

  return (
    <div
      className={cn("flex w-full items-end gap-2", {
        "justify-end": isUser,
      })}
    >
      {/* Avatar */}
      {!isUser && (
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg" alt="AI" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      )}

      {/* Message Bubble */}
      <div
        className={cn("flex max-w-[70%] flex-col space-y-1", {
          "items-end": isUser,
        })}
      >
        <div
          className={cn("rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap", {
            "bg-blue-600 text-white": isUser,
            "bg-gray-800 text-gray-100": !isUser,
          })}
        >
          {/* Uploaded Image */}
          {image && (
            <div className="mb-2 overflow-hidden rounded-lg">
              <img
                src={`data:image/jpeg;base64,${image}`}
                alt="Uploaded image"
                className="h-auto max-h-60 w-full object-cover rounded-lg"
              />
            </div>
          )}

          {/* Only show text if it's real text */}
          {(!image || (image && content.trim() !== "Uploaded image")) && (
            isTyping ? (
              <span className="italic text-gray-400 animate-pulse">Assistant is typing...</span>
            ) : (
              <ReactMarkdown>{content}</ReactMarkdown>
            )
          )}
        </div>

        {/* Timestamp */}
        {safeTimestamp && (
          <span className="text-xs text-gray-500">{safeTimestamp}</span>
        )}
      </div>

      {/* Avatar for User */}
      {isUser && (
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg" alt="User" />
          <AvatarFallback>You</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
