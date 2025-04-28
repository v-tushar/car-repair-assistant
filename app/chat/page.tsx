"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import ChatInterface from "../../components/chat-interface";
export default function ChatPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/"); // 🚀 If no user logged in, send back to login
      } else {
        setLoading(false); // ✅ User is logged in
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 text-white">
        Loading...
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-gray-950">
      <ChatInterface />
    </main>
  );
}
