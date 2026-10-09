"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  async function handleLogin(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }

      console.log("Login successful");
      router.replace("/products");
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  return (
    <div>
      <h1>Log In</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="rounded-md bg-yellow px-4 py-2 text-sm font-semibold text-purple-dark transition hover:bg-yellow-dark">
          Sign In
        </button>
      </form>
    </div>
  );
}
