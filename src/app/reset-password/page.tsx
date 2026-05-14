"use client";

import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = useMemo(() => searchParams.get("token") ?? "", [searchParams]);

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();
      setMessage(data.message ?? data.error ?? "Request completed.");
    } catch {
      setMessage("Could not reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 420, margin: "48px auto", padding: 16 }}>
      <h1>Reset Password</h1>
      <p>Choose your new password below.</p>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <input
          type="password"
          placeholder="New password"
          minLength={8}
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          style={{ padding: 10 }}
        />
        <button type="submit" disabled={isLoading || !token} style={{ padding: 10 }}>
          {isLoading ? "Saving..." : "Reset Password"}
        </button>
      </form>

      {!token ? <p style={{ color: "crimson" }}>Reset token is missing.</p> : null}
      {message ? <p style={{ marginTop: 12 }}>{message}</p> : null}
    </main>
  );
}
