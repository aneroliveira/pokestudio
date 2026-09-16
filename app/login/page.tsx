import { PageContainer } from "@/components/layout/PageContainer";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { entrar } from "./actions";

type LoginPageProps = {
  searchParams: Promise<{ next?: string; erro?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { next = "/admin", erro } = await searchParams;

  return (
    <PageContainer>
      <div className="w-full max-w-sm">
        <Card>
          <h1 className="text-xl font-bold">Entrar</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Conteúdo pessoal do PokéStudio. Digite a senha pra continuar.
          </p>

          <form action={entrar} className="mt-5 space-y-3">
            <input type="hidden" name="next" value={next} />
            <Input
              type="password"
              name="senha"
              placeholder="Senha"
              autoFocus
              required
            />

            {erro === "1" && (
              <p className="text-sm text-destructive">Senha incorreta.</p>
            )}

            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>
        </Card>
      </div>
    </PageContainer>
  );
}
