// types/next-auth.d.ts

import NextAuth from "next-auth";
import { Role } from "@prisma/client";

declare module "next-auth" {
  interface User extends NextAuth.DefaultUser {
    username: string;
    role: Role;
  }

  interface Session extends NextAuth.DefaultSession {
    user: {
      id: string;
      username: string;
      name: string;
      email: string;
      role: Role;
    };
  }
}
