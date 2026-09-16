"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_ADMIN, criarCookieAdmin, verificarSenha } from "@/lib/auth/adminSession";

export async function entrar(formData: FormData) {
  const senha = String(formData.get("senha") ?? "");
  const destinoBruto = String(formData.get("next") || "/admin");
  const next = destinoBruto.startsWith("/") ? destinoBruto : "/admin";

  if (!verificarSenha(senha)) {
    redirect(`/login?erro=1&next=${encodeURIComponent(next)}`);
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_ADMIN.nome, criarCookieAdmin(), COOKIE_ADMIN.opcoes);

  redirect(next);
}
