"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // 👈 NEW
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // 👈 NEW

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("✅ Account created successfully");
      router.push("/"); // 👈 Redirect to Login page after signup
    } catch (error) {
      console.error("❌ Signup error:", error);
    }
  };

  return (
    <Card className="border-gray-800 bg-gray-900 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-white">Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-gray-700 bg-gray-800 text-white placeholder:text-gray-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-300">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-gray-700 bg-gray-800 text-white placeholder:text-gray-500"
            />
          </div>
          <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
            Sign Up
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
