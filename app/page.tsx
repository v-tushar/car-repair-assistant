// src/app/page.tsx
"use client"

import LoginForm from "@/components/login-form"

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-950 p-4">
      <LoginForm />
    </main>
  )
}
