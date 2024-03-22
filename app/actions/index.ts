"use server";

import * as auth from "@/app/auth";

export async function signIn(provider: string) {
  return auth.signIn(provider);
}

export async function signOut() {
  return auth.signOut();
}
