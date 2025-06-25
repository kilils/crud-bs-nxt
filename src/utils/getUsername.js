import "server-only";

import { cookies } from "next/headers";

export async function getUsername() {
  const cookieStore = await cookies();
  const username = cookieStore.get("username").value;

  return username;
}
