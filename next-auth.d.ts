import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id?: string;
      name?: string;
      email?: string;
      image?: string;
      access_token: string;
      token_type?: string;
    };
  }
}
