"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_ADMIN } from "@/lib/auth/adminSession";

export async function sair() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_ADMIN.nome);
  redirect("/");
}
