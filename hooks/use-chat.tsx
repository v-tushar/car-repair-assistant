"use client";

import { useState } from "react";

type MessageRole = "user" | "assistant";

interface Message {
  role: MessageRole;
  content: string;
  timestamp: string;
  image?: string;
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your Car Repair AI Assistant. How can I help you with your vehicle today?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchYouTubeVideos = async (query: string) => {
    try {
      const searchQuery = `${query} car repair tutorial`;
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=AIzaSyCM3JjrKz7-4-yx6w0byiq0fCNCr-NyffU&type=video&part=snippet&maxResults=2&q=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      return data.items || [];
    } catch (error) {
      console.error("YouTube fetch error:", error);
      return [];
    }
  };

  const sendMessage = async (content: string, image?: string) => {
    if (!content.trim() && !image) return;

    const userMessage: Message = {
      role: "user",
      content: image ? "[Uploaded image]" : content.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      image,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const bodyPayload: any = {
        userQuestion: content.trim() || "Analyze the uploaded image",
      };
      if (image) {
        bodyPayload.imageUrl = image;
      }

      const response = await fetch("http://localhost:5001/ai-chat-b40c9/us-central1/analyzeImageAndQuestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyPayload),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage: Message = {
        role: "assistant",
        content: data.guide,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // ✅ Fetch YouTube videos ONLY if user typed a message
      if (content.trim().length > 0) {
        const videos = await fetchYouTubeVideos(content.trim());
        if (videos.length > 0) {
          videos.forEach((video: any) => {
            const videoMessage: Message = {
              role: "assistant",
              content: `![${video.snippet.title}](https://img.youtube.com/vi/${video.id.videoId}/0.jpg)\n[Watch Video](https://www.youtube.com/watch?v=${video.id.videoId})`,
              timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            };
            setMessages((prev) => [...prev, videoMessage]);
          });
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    sendMessage,
    isLoading,
  };
}
