import Link from "next/link";

export function MainHeader() {
  return (
    <header className="w-full border-b border-black/6 bg-white">
      <div className="mx-auto max-w-3xl px-4 py-3">
        <nav className="flex items-center justify-start gap-4">
          <Link href="/" className="text-sm font-medium text-black/80 hover:text-black">
            Home
          </Link>
          <Link href="/searchIV" className="text-sm font-medium text-black/80 hover:text-black">
            Calculadora
          </Link>
          <Link href="/admin" className="text-sm font-medium text-black/80 hover:text-black">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
