"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ImageIcon, SendHorizontal } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (content: string, image?: string) => Promise<void>;
  isLoading: boolean;
}

export default function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [input, setInput] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = async () => {
    if (!input.trim() && !imageFile) return;

    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = (reader.result as string).split(",")[1];
        await onSendMessage(input, base64);
        setImageFile(null);
        setInput("");
      };
      reader.readAsDataURL(imageFile);
    } else {
      await onSendMessage(input);
      setInput("");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        type="text"
        placeholder="Describe your car problem..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={isLoading}
        className="flex-1 bg-gray-800 text-white placeholder:text-gray-400"
      />
      <Button
        variant="ghost"
        size="icon"
        className="text-gray-400 hover:text-white"
        onClick={() => fileInputRef.current?.click()}
        disabled={isLoading}
      >
        <ImageIcon className="h-5 w-5" />
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </Button>
      <Button
        size="icon"
        onClick={handleSend}
        disabled={isLoading || (!input.trim() && !imageFile)}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        {isLoading ? (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : (
          <SendHorizontal className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
}
