"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ ADD THIS
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import GoogleButton from "./google-button";

import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginForm() {
  const router = useRouter(); // ✅ INITIATE ROUTER
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ Logged in successfully!");

      router.push("/chat"); // ✅ REDIRECT TO CHAT AFTER LOGIN SUCCESS
    } catch (error) {
      console.error("❌ Login error:", error);
    }
  };

  return (
    <Card className="border-gray-800 bg-gray-900 shadow-lg">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight text-white">
          Welcome to Car Repair AI Assistant 🚗🔧
        </CardTitle>
        <CardDescription className="text-gray-400">Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-gray-700 bg-gray-800 text-white placeholder:text-gray-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-300">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-gray-700 bg-gray-800 pr-10 text-white placeholder:text-gray-500"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-gray-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
              </Button>
            </div>
          </div>
          <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">Sign In</Button>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-900 px-2 text-gray-400">Or continue with</span>
            </div>
          </div>
          <GoogleButton />
          <div className="text-center text-sm">
            <Link href="/signup" className="text-blue-500 hover:text-blue-400">
              Don&apos;t have an account? Sign up
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
