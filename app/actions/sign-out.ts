"use server";

import * as auth from "@/app/auth";

export async function signOut() {
  return auth.signOut();
}
