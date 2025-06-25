"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(_, formData) {
  const cookieStore = await cookies();
  const username = formData.get("username");

  // save to cookies
  cookieStore.set("username", username);
  redirect("/notes");
}
