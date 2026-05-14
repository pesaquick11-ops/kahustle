"use client";

import { FormEvent, useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setMessage(data.message ?? data.error ?? "Request completed.");
    } catch {
      setMessage("Could not send reset request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 420, margin: "48px auto", padding: 16 }}>
      <h1>Forgot Password</h1>
      <p>Enter your email and we&apos;ll send a confirmation link to reset your password.</p>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <input
          type="email"
          placeholder="you@example.com"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          style={{ padding: 10 }}
        />
        <button type="submit" disabled={isLoading} style={{ padding: 10 }}>
          {isLoading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      {message ? <p style={{ marginTop: 12 }}>{message}</p> : null}
    </main>
  );
}
