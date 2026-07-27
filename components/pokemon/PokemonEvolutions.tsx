"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Coins, Dna, Gem, Info } from "lucide-react";
import type {
  Pokemon,
  EvolucaoReferencia,
  RequisitoEvolucao,
} from "@/models/pokemon";
import type { ItemIndicePokemon } from "@/models/indice";
import { SectionCard } from "@/components/ui/SectionCard";
import {
  ICONE_DOCE,
  ICONE_GENERICO_ITEM,
  traduzirItemEvolucao,
  urlIconeItemEvolucao,
} from "@/constants/evolutionItemIcons";
import { traduzirCondicaoEvolucao } from "@/services/pokemon/traduzirCondicaoEvolucao";

const ICONES_GENERICOS = {
  gem: Gem,
  coins: Coins,
  dna: Dna,
} as const;

type PokemonEvolutionsProps = {
  pokemon: Pokemon;
  onSelecionarPokemon?: (item: ItemIndicePokemon) => void;
};

function capitalizar(nome: string): string {
  return nome.charAt(0).toUpperCase() + nome.slice(1);
}

function SetaComRequisito({
  requisito,
}: {
  requisito?: RequisitoEvolucao;
}) {
  const [condicaoAberta, setCondicaoAberta] = useState(false);
  const iconeItem = requisito?.item
    ? urlIconeItemEvolucao(requisito.item)
    : null;
  const generico = requisito?.item
    ? ICONE_GENERICO_ITEM[requisito.item]
    : undefined;
  const IconeGenericoItem =
    !iconeItem && generico ? ICONES_GENERICOS[generico] : null;

  return (
    <div className="flex w-24 shrink-0 flex-col items-center gap-1">
      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />

      {requisito && (
        <div className="flex w-full flex-col items-center gap-1 text-center text-[10px] leading-tight text-muted-foreground">
          {requisito.doces != null && (
            <span className="flex items-center gap-1">
              <Image src={ICONE_DOCE} alt="Doce" width={14} height={14} />
              {requisito.doces}
            </span>
          )}

          {requisito.item && (
            <span className="flex w-full flex-col items-center gap-0.5">
              {iconeItem ? (
                <Image
                  src={iconeItem}
                  alt={requisito.item}
                  width={16}
                  height={16}
                />
              ) : (
                IconeGenericoItem && (
                  <IconeGenericoItem className="h-4 w-4" />
                )
              )}
              <span className="break-words">
                {traduzirItemEvolucao(requisito.item)}
              </span>
            </span>
          )}

          {requisito.quest && (
            // Toca em "condição" e o texto abre inline, ali mesmo — sem
            // tooltip por hover nem balão flutuante que sai da tela. O botão
            // é um elemento à parte do card clicável, então tocá-lo só
            // expande a condição; tocar no card (fora dele) navega normal.
            <>
              <button
                type="button"
                onClick={() => setCondicaoAberta((v) => !v)}
                aria-expanded={condicaoAberta}
                className="flex items-center gap-0.5 text-primary"
              >
                <Info className="h-3 w-3" />
                condição
              </button>

              {condicaoAberta && (
                <span className="mt-0.5 rounded-md bg-accent px-1.5 py-1 text-[10px] leading-tight text-foreground">
                  {traduzirCondicaoEvolucao(requisito.quest)}
                </span>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

function EstagioCard({
  estagio,
  onSelecionar,
}: {
  estagio: EvolucaoReferencia;
  onSelecionar?: () => void;
}) {
  const conteudo = (
    <>
      <Image
        src={estagio.imagem}
        alt={capitalizar(estagio.nome)}
        width={56}
        height={56}
      />

      <span className="text-xs font-medium leading-tight">
        {capitalizar(estagio.nome)}
      </span>
    </>
  );

  if (!onSelecionar) {
    return (
      <div className="flex flex-col items-center gap-1 rounded-xl border border-border bg-accent p-3 text-center">
        {conteudo}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onSelecionar}
      className="flex flex-col items-center gap-1 rounded-xl border border-border bg-accent p-3 text-center transition hover:border-primary hover:bg-accent/70"
    >
      {conteudo}
    </button>
  );
}

function decompor(raiz: EvolucaoReferencia): {
  linha: EvolucaoReferencia[];
  ramosRestantes: EvolucaoReferencia[];
} {
  const linha: EvolucaoReferencia[] = [];
  let ramosRestantes: EvolucaoReferencia[] = [];
  let atual: EvolucaoReferencia | undefined = raiz;

  while (atual) {
    linha.push(atual);
    const ramos: EvolucaoReferencia[] = atual.proximas;

    if (ramos.length === 1) {
      atual = ramos[0];
    } else {
      // Fim da linha (0 ramos) ou bifurcação (2+): em ambos os casos a
      // sequência reta pára aqui — cada ramo vira sua própria seta, em
      // vez de "engolir" um deles na mesma linha.
      ramosRestantes = ramos;
      atual = undefined;
    }
  }

  return { linha, ramosRestantes };
}

function Ramo({
  raiz,
  ehRaizPrincipal,
  onSelecionar,
}: {
  raiz: EvolucaoReferencia;
  ehRaizPrincipal: boolean;
  onSelecionar?: (estagio: EvolucaoReferencia) => void;
}) {
  const { linha, ramosRestantes } = decompor(raiz);
  const ramosSaoFolhas = ramosRestantes.every(
    (ramo) => ramo.proximas.length === 0,
  );
  // Bifurcação simples (2 opções, ex.: Poliwhirl → Poliwrath/Politoed):
  // uma seta pra cada, empilhadas verticalmente logo depois do card de
  // origem. Com 3+ (ex.: Eevee) não há como empilhar sem ocupar a tela
  // toda, então vira grade lado a lado — mesma seta+card, só organizada
  // horizontalmente.
  const empilharRamos = ramosRestantes.length === 2;
  // Na grade (3+ ramos, ex.: Eevee), separa quem exige condição especial
  // (ex.: Espeon/Umbreon/Sylveon) do resto — viram um bloco à parte,
  // forçando a quebra de linha entre os grupos. Só reordenar não bastava:
  // o flex-wrap quebra por largura, não por grupo, então um ramo com
  // condição podia cair na mesma linha dos sem condição.
  const semCondicao = empilharRamos
    ? []
    : ramosRestantes.filter((ramo) => !ramo.requisito?.quest);
  const comCondicao = empilharRamos
    ? []
    : ramosRestantes.filter((ramo) => ramo.requisito?.quest);

  function renderRamo(ramo: EvolucaoReferencia) {
    return (
      <div key={ramo.nome} className="flex items-center gap-2">
        <SetaComRequisito requisito={ramo.requisito} />

        {ramosSaoFolhas ? (
          <EstagioCard
            estagio={ramo}
            onSelecionar={
              onSelecionar ? () => onSelecionar(ramo) : undefined
            }
          />
        ) : (
          <Ramo
            raiz={ramo}
            ehRaizPrincipal={false}
            onSelecionar={onSelecionar}
          />
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {linha.map((estagio, indice) => {
          const ehCardPrincipal = ehRaizPrincipal && indice === 0;

          return (
            <div key={estagio.nome} className="flex items-center gap-2">
              {indice > 0 && (
                <SetaComRequisito requisito={estagio.requisito} />
              )}

              <EstagioCard
                estagio={estagio}
                onSelecionar={
                  ehCardPrincipal || !onSelecionar
                    ? undefined
                    : () => onSelecionar(estagio)
                }
              />
            </div>
          );
        })}

        {empilharRamos && (
          // Bifurcação de 2: as duas setas ficam empilhadas como uma
          // única unidade logo após o card de origem.
          <div className="flex flex-col gap-2">
            {ramosRestantes.map(renderRamo)}
          </div>
        )}

        {/* 3+ ramos sem condição: seguem soltos no mesmo flex-wrap do
            card de origem, então o primeiro continua na mesma linha em
            vez de forçar uma quebra. */}
        {semCondicao.map(renderRamo)}
      </div>

      {comCondicao.length > 0 && (
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {comCondicao.map(renderRamo)}
        </div>
      )}
    </div>
  );
}

export function PokemonEvolutions({
  pokemon,
  onSelecionarPokemon,
}: PokemonEvolutionsProps) {
  const atual: EvolucaoReferencia = {
    nome:
      pokemon.oficial.nome.ptBR ||
      pokemon.oficial.nome.enUS ||
      pokemon.oficial.numero,
    numero: pokemon.oficial.numero,
    imagem: pokemon.oficial.imagem,
    proximas: pokemon.oficial.evolucao.proximas,
  };

  if (atual.proximas.length === 0) {
    return null;
  }

  return (
    <SectionCard title="Evoluções">
      <Ramo
        raiz={atual}
        ehRaizPrincipal
        onSelecionar={
          onSelecionarPokemon
            ? (estagio) =>
                onSelecionarPokemon({
                  id: 0,
                  numero: estagio.numero,
                  nomeEn: estagio.nome,
                })
            : undefined
        }
      />
    </SectionCard>
  );
}
