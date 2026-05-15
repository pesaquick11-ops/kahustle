import crypto from "node:crypto"
import { connectToDatabase } from "@/lib/db"
import { User } from "@/models/User"

const RESET_WINDOW_MS = 1000 * 60 * 30 // 30 minutes

function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex")
}

export async function createPasswordResetToken(email: string) {
  await connectToDatabase()
  const user = await User.findOne({ email: email.toLowerCase() }).select("_id")

  if (!user) {
    return null
  }

  const token = crypto.randomBytes(32).toString("hex")
  user.passwordResetTokenHash = hashToken(token)
  user.passwordResetExpiresAt = new Date(Date.now() + RESET_WINDOW_MS)
  await user.save()

  return token
}

export async function consumePasswordResetToken(token: string) {
  await connectToDatabase()
  const tokenHash = hashToken(token)

  const user = await User.findOne({
    passwordResetTokenHash: tokenHash,
    passwordResetExpiresAt: { $gt: new Date() },
  }).select("+password email passwordResetTokenHash passwordResetExpiresAt")

  if (!user) {
    return null
  }

  user.passwordResetTokenHash = undefined
  user.passwordResetExpiresAt = undefined
  return user
}

export function getPasswordResetLink(token: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
  return `${appUrl}/reset-password?token=${token}`
}

export async function sendPasswordResetEmail(email: string, resetLink: string) {
  const smtpHost = process.env.SMTP_HOST
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.info(`Password reset email for ${email}: ${resetLink}`)
    return
  }

  console.info(`SMTP configured for ${smtpHost}. Reset email for ${email}: ${resetLink}`)
}
