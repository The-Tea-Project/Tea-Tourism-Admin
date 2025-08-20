import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

if (!process.env.CLERK_SECRET_KEY) {
  throw new Error("Missing CLERK_SECRET_KEY in environment");
}

export const requireAuth = ClerkExpressRequireAuth({
  secretKey: process.env.CLERK_SECRET_KEY,
});
