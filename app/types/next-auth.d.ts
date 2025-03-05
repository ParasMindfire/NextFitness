import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add the id property
    } & DefaultSession["user"];
  }

  interface User {
    id: string; // Ensure User object also has an id
  }
}
