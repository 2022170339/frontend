"use server";

import { signIn } from "@/auth";

export async function SignIn({
  id,
  password,
}: {
  id: string;
  password: string;
}) {
  try {
    await signIn("credentials", {
      id,
      password,
      redirect: false,
    });
    return true;
  } catch (e: any) {
    throw new Error(e);
  }
}
