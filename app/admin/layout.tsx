import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_ADMIN, cookieAdminValido } from "@/lib/auth/adminSession";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const autenticado = cookieAdminValido(cookieStore.get(COOKIE_ADMIN.nome)?.value);

  if (!autenticado) {
    redirect("/login?next=/admin");
  }

  return <>{children}</>;
}
