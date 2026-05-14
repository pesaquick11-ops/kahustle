import crypto from "node:crypto";

type PasswordResetRequest = {
  email: string;
  expiresAt: number;
};

const resetRequests = new Map<string, PasswordResetRequest>();

const RESET_WINDOW_MS = 1000 * 60 * 30; // 30 minutes

export function createPasswordResetToken(email: string) {
  const token = crypto.randomBytes(32).toString("hex");

  resetRequests.set(token, {
    email,
    expiresAt: Date.now() + RESET_WINDOW_MS,
  });

  return token;
}

export function consumePasswordResetToken(token: string) {
  const request = resetRequests.get(token);

  if (!request) {
    return null;
  }

  resetRequests.delete(token);

  if (request.expiresAt < Date.now()) {
    return null;
  }

  return request.email;
}

export function getPasswordResetLink(token: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  return `${appUrl}/reset-password?token=${token}`;
}

export async function sendPasswordResetEmail(email: string, resetLink: string) {
  // Replace this with your mail provider implementation.
  // Keeping this as a log-only fallback so local development works by default.
  console.info(`Password reset email for ${email}: ${resetLink}`);
}
