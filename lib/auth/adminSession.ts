import { createHmac, timingSafeEqual } from "crypto";

const NOME_COOKIE = "pokestudio_admin";
const DURACAO_COOKIE_SEGUNDOS = 60 * 60 * 24 * 180;

function segredo(): string {
  const valor = process.env.ADMIN_PASSWORD;
  if (!valor) {
    throw new Error("ADMIN_PASSWORD não configurada no ambiente do servidor.");
  }
  return valor;
}

function assinar(payload: string): string {
  return createHmac("sha256", segredo()).update(payload).digest("hex");
}

function compararComSeguranca(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function verificarSenha(senha: string): boolean {
  return compararComSeguranca(senha, segredo());
}

export function criarCookieAdmin(): string {
  const expiraEm = String(Date.now() + DURACAO_COOKIE_SEGUNDOS * 1000);
  return `${expiraEm}.${assinar(expiraEm)}`;
}

export function cookieAdminValido(valor: string | undefined): boolean {
  if (!valor) return false;

  const [expiraEm, assinatura] = valor.split(".");
  if (!expiraEm || !assinatura) return false;
  if (Date.now() > Number(expiraEm)) return false;

  return compararComSeguranca(assinatura, assinar(expiraEm));
}

export const COOKIE_ADMIN = {
  nome: NOME_COOKIE,
  opcoes: {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: DURACAO_COOKIE_SEGUNDOS,
  },
};
