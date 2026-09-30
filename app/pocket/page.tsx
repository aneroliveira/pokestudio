import { redirect } from "next/navigation";

// RFC-005: a ficha rápida virou um modo da Home. A rota continua existindo
// só pra não quebrar links salvos — abre a Home já no modo Rápida.
export default function PocketPage() {
  redirect("/?modo=rapida");
}
