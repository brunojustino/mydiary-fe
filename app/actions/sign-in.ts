"use server";

import * as auth from "@/app/auth";

export async function signIn(provider: string) {
  return auth.signIn(provider, { callbackUrl: "/" });
}
