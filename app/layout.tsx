import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { MainHeader } from "@/components/layout/MainHeader";
import { AppBackground } from "@/components/layout/AppBackground";

// Aplica o tema salvo (ou o preferido pelo sistema) antes da primeira
// pintura, evitando flash de tema errado.
const scriptTema = `(function(){try{var t=localStorage.getItem('tema');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}})();`;

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PokéPocket da Lori",
  // title: "PokéStudio da Lori", // nome anterior, antes do domínio pogopocket.vercel.app
  description: "O companheiro para decisões inteligentes no Pokémon GO.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">
        {/* Script cru, não o componente <Script> do Next — beforeInteractive
            só executa quando o bundle JS carrega e processa a fila
            __next_s, o que no dev server é lento o bastante pra piscar o
            tema. Uma <script> comum bloqueia o parse e roda na hora. */}
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{ __html: scriptTema }}
        />

        <AppBackground />

        <MainHeader />

        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
