"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { PageContainer } from "@/components/layout/PageContainer";
import { SearchBar } from "@/components/pokemon/SearchBar";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip } from "@/components/ui/Tooltip";
import { GroupedIVBar } from "@/components/pokemon/IVBar";
import type { Pokemon } from "@/models/pokemon";
import type { ItemIndicePokemon } from "@/models/indice";
import { buscarPokemon } from "@/services/pokemon";
import { importarPokemon } from "@/services/pokemon/importPokemon";
import { obterBaseStatsGO } from "@/services/pokemon/statsGO";
import {
  calcularCpParaExibicao,
  gerarResultadoSearchIv,
  type IVsGO,
} from "@/services/pokemon/searchIv";
import { createEmptyPokemon } from "@/utils/createEmptyPokemon";

const IV_100 = { attack: 15, defense: 15, stamina: 15 };

type ModoIv = "iv100" | "exatas";

export default function SearchIvPage() {
  const [pesquisa, setPesquisa] = useState("");
  const [pokemonSelecionado, setPokemonSelecionado] = useState<Pokemon | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [cpJogo, setCpJogo] = useState<string>(() => {
    try {
      const raw = localStorage.getItem("searchIV:last");
      if (raw) {
        const parsed = JSON.parse(raw);
        return parsed.cpJogo ? String(parsed.cpJogo) : "420";
      }
    } catch {
      // ignore
    }
    return "420";
  });

  const [comClima, setComClima] = useState<boolean>(() => {
    try {
      const raw = localStorage.getItem("searchIV:last");
      if (raw) {
        const parsed = JSON.parse(raw);
        return typeof parsed.comClima === "boolean" ? parsed.comClima : false;
      }
    } catch {
      // ignore
    }
    return false;
  });

  const [modoIv, setModoIv] = useState<ModoIv>(() => {
    try {
      const raw = localStorage.getItem("searchIV:last");
      if (raw) {
        const parsed = JSON.parse(raw);
        return parsed.modoIv ?? "iv100";
      }
    } catch {
      // ignore
    }
    return "iv100";
  });

  const [ivsExatas, setIvsExatas] = useState<IVsGO>(() => {
    try {
      const raw = localStorage.getItem("searchIV:last");
      if (raw) {
        const parsed = JSON.parse(raw);
        return parsed.ivs ?? IV_100;
      }
    } catch {
      // ignore
    }
    return IV_100;
  });

  const [ivsTexto, setIvsTexto] = useState<Record<keyof IVsGO, string>>(() => ({
    attack: String(ivsExatas.attack),
    defense: String(ivsExatas.defense),
    stamina: String(ivsExatas.stamina),
  }));

  const [resultado, setResultado] = useState<ReturnType<typeof gerarResultadoSearchIv>>(undefined);

  const resultados = buscarPokemon(pesquisa);
  const baseStatsGO = pokemonSelecionado
    ? obterBaseStatsGO(Number(pokemonSelecionado.oficial.numero.replace("#", "")))
    : undefined;

  useEffect(() => {
    const payload = { cpJogo, comClima, modoIv, ivs: ivsExatas };
    try {
      localStorage.setItem("searchIV:last", JSON.stringify(payload));
    } catch {
      // ignore
    }
  }, [cpJogo, comClima, modoIv, ivsExatas]);

  async function selecionarPokemon(item: ItemIndicePokemon) {
    setPesquisa("");
    setCarregando(true);
    setResultado(undefined);

    try {
      const importado = await importarPokemon(item.nomeEn);
      const base = createEmptyPokemon();

      setPokemonSelecionado({
        ...base,
        oficial: importado.oficial ?? base.oficial,
      });
    } catch (error) {
      console.error(error);
      alert("Não foi possível carregar o Pokémon.");
    } finally {
      setCarregando(false);
    }
  }

  function calcular() {
    if (!pokemonSelecionado) return;

    if (!baseStatsGO) {
      alert(
        "Sem base stats do GO para este número (Megas/formas alternativas não estão cobertas).",
      );
      return;
    }

    const cpNumerico = Number(cpJogo);

    if (!Number.isFinite(cpNumerico) || cpNumerico <= 0) {
      alert("Digite um CP válido.");
      return;
    }

    const ivs = modoIv === "iv100" ? IV_100 : ivsExatas;

    const resultadoCalculado = gerarResultadoSearchIv(
      pokemonSelecionado.oficial.numero,
      cpNumerico,
      ivs,
      comClima,
    );

    setResultado(resultadoCalculado);
  }

  function digitarIv(chave: keyof IVsGO, valorBruto: string) {
    const digitos = valorBruto.replace(/\D/g, "").slice(0, 2);

    if (digitos === "") {
      setIvsTexto((prev) => ({ ...prev, [chave]: "" }));
      return;
    }

    // Clampa o valor (e o texto exibido) na hora — não depende de blur.
    const numero = Math.min(15, Number(digitos));
    setIvsTexto((prev) => ({ ...prev, [chave]: String(numero) }));
    setIvsExatas((prev) => ({ ...prev, [chave]: numero }));
  }

  function finalizarIv(chave: keyof IVsGO) {
    setIvsTexto((prev) => ({ ...prev, [chave]: String(ivsExatas[chave]) }));
  }

  function ajustarIv(chave: keyof IVsGO, delta: number) {
    const novo = Math.min(15, Math.max(0, ivsExatas[chave] + delta));
    setIvsExatas((prev) => ({ ...prev, [chave]: novo }));
    setIvsTexto((prev) => ({ ...prev, [chave]: String(novo) }));
  }

  return (
    <PageContainer>
      <div className="w-full max-w-3xl space-y-6">
        <div className="flex items-center gap-2">
          <SectionTitle
            title="Buscar IV / Nível"
            subtitle="Descubra o nível estimado pelo CP e veja hundo/quase-hundo."
          />
          <div className="mt-1">
            <Tooltip
              content={
                <>
                  A estimativa usa a fórmula de CP do Pokémon GO (base
                  stats reais + IVs + CPM por nível). Para 100% assume
                  15/15/15; pequenas diferenças de IV podem não alterar o
                  CP por arredondamento.
                </>
              }
            />
          </div>
        </div>

        <div className="rounded-[20px] border border-black/8 bg-white p-4 shadow-[0_8px_24px_rgba(0,0,0,0.06)] mt-3">
          <SearchBar
            value={pesquisa}
            onChange={setPesquisa}
            onSelect={selecionarPokemon}
            resultados={resultados}
            placeholder="Busque um Pokémon para calcular"
          />

          {carregando ? (
            <p className="mt-4 text-sm text-zinc-500">Carregando dados oficiais...</p>
          ) : null}

          {pokemonSelecionado ? (
            <div className="mt-6 space-y-4 rounded-[24px] border border-black/10 bg-[#fff7f7] p-5">
              <div className="flex items-center gap-3">
                <Image
                  src={pokemonSelecionado.oficial.imagem || "/"}
                  alt={pokemonSelecionado.oficial.nome.enUS}
                  width={56}
                  height={56}
                  className="h-14 w-14 rounded-xl object-contain"
                />
                <div className="min-w-0">
                  <p className="text-sm uppercase tracking-[0.25em] text-zinc-500 truncate">
                    {pokemonSelecionado.oficial.numero}
                  </p>
                  <h2 className="text-lg font-semibold text-black truncate">
                    {pokemonSelecionado.oficial.nome.enUS}
                  </h2>
                  <p className="text-sm text-zinc-600 truncate">
                    {baseStatsGO
                      ? `Base: Atk ${baseStatsGO.attack} • Def ${baseStatsGO.defense} • Sta ${baseStatsGO.stamina}`
                      : "Sem base stats do GO (Mega/forma alternativa)."}
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-zinc-700">CP no jogo</label>
                    <Tooltip
                      content={
                        <>
                          CP (Combat Power) é calculado pelo jogo a partir
                          dos stats finais (base + IV) e do multiplicador
                          de nível. Pequenas diferenças de IV podem não
                          alterar o CP visivelmente por causa do
                          arredondamento.
                        </>
                      }
                    />
                  </div>

                  <Input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={cpJogo}
                    onChange={(event) => {
                      const raw = event.target.value || "";
                      const digits = raw.replace(/\D/g, "").slice(0, 5);
                      setCpJogo(digits);
                    }}
                    placeholder="Ex.: 420"
                    className="border-black/10 bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-zinc-700">Contexto</label>
                    <Tooltip
                      content={
                        <>
                          Sem clima assume o CP normal; Com clima aplica
                          uma estimativa de boost de clima (~+8% de CP).
                        </>
                      }
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant={!comClima ? "default" : "outline"}
                      onClick={() => setComClima(false)}
                      className={!comClima ? "bg-red-600 hover:bg-red-700" : "border-black/10 bg-white text-black hover:bg-zinc-50"}
                    >
                      Sem clima
                    </Button>
                    <Button
                      type="button"
                      variant={comClima ? "default" : "outline"}
                      onClick={() => setComClima(true)}
                      className={comClima ? "bg-red-600 hover:bg-red-700" : "border-black/10 bg-white text-black hover:bg-zinc-50"}
                    >
                      Com clima
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-zinc-700">Modo de IV</label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant={modoIv === "iv100" ? "default" : "outline"}
                    onClick={() => {
                      setModoIv("iv100");
                      setIvsExatas(IV_100);
                      setIvsTexto({ attack: "15", defense: "15", stamina: "15" });
                    }}
                    className={modoIv === "iv100" ? "bg-red-600 hover:bg-red-700" : "border-black/10 bg-white text-black hover:bg-zinc-50"}
                  >
                    Assumir IV 100%
                  </Button>
                  <Button
                    type="button"
                    variant={modoIv === "exatas" ? "default" : "outline"}
                    onClick={() => setModoIv("exatas")}
                    className={modoIv === "exatas" ? "bg-red-600 hover:bg-red-700" : "border-black/10 bg-white text-black hover:bg-zinc-50"}
                  >
                    Usar IV exatas
                  </Button>
                </div>

                {modoIv === "exatas" ? (
                  <div className="grid gap-3 rounded-2xl border border-black/10 bg-white p-3 md:grid-cols-3">
                    <IvExataInput
                      campo="attack"
                      label="Atk IV"
                      valor={ivsExatas.attack}
                      texto={ivsTexto.attack}
                      onDigitar={(valor) => digitarIv("attack", valor)}
                      onFinalizar={() => finalizarIv("attack")}
                      onAjustar={(delta) => ajustarIv("attack", delta)}
                    />
                    <IvExataInput
                      campo="defense"
                      label="Def IV"
                      valor={ivsExatas.defense}
                      texto={ivsTexto.defense}
                      onDigitar={(valor) => digitarIv("defense", valor)}
                      onFinalizar={() => finalizarIv("defense")}
                      onAjustar={(delta) => ajustarIv("defense", delta)}
                    />
                    <IvExataInput
                      campo="stamina"
                      label="Sta IV"
                      valor={ivsExatas.stamina}
                      texto={ivsTexto.stamina}
                      onDigitar={(valor) => digitarIv("stamina", valor)}
                      onFinalizar={() => finalizarIv("stamina")}
                      onAjustar={(delta) => ajustarIv("stamina", delta)}
                    />
                  </div>
                ) : null}
              </div>

              <Button
                type="button"
                onClick={calcular}
                className="w-full justify-center bg-black text-white hover:bg-zinc-800"
              >
                Calcular nível e benchmarks
              </Button>
            </div>
          ) : null}

          {resultado ? (
            <div className="mt-6 rounded-[24px] border border-black/10 bg-[#fff7f7] p-5">
              <div className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-center sm:text-left">
                  <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">Estimativa prática</p>
                  <h3 className="text-3xl font-semibold text-black">
                    {resultado.nivelEstimado.toFixed(1)}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-600">Baseado no CP informado, clima e modo de IV.</p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500 text-center sm:text-left">
                  Hundo / quase hundo
                </h4>

                {modoIv === "exatas" ? (
                  <>
                    <div className="flex flex-col gap-2 rounded-2xl border border-black/10 bg-white px-3 py-3 mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-16">
                          <p className="text-lg font-semibold text-black tabular-nums">
                            {Math.round(((ivsExatas.attack + ivsExatas.defense + ivsExatas.stamina) / 45) * 100)}%
                          </p>
                          <p className="text-xs text-zinc-500">IVs</p>
                        </div>

                        <div className="flex-1">
                          <GroupedIVBar attack={ivsExatas.attack} defense={ivsExatas.defense} stamina={ivsExatas.stamina} showValuesLeft={false} />
                        </div>

                        <div className="ml-3">
                          <p className="text-sm font-semibold text-red-600">
                            CP:{" "}
                            {calcularCpParaExibicao(
                              pokemonSelecionado!.oficial.numero,
                              resultado.nivelEstimado,
                              ivsExatas,
                              comClima,
                            ) ?? "—"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <hr className="my-2 border-t border-black/10" />
                  </>
                ) : null}

                {resultado.comparativo.map((item) => (
                  <div key={item.label} className="flex flex-col gap-2 rounded-2xl border border-black/10 bg-white px-3 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-16">
                        <p className="text-lg font-semibold text-black tabular-nums">
                          {Math.round(((item.ivs.attack + item.ivs.defense + item.ivs.stamina) / 45) * 100)}%
                        </p>
                        <p className="text-xs text-zinc-500">{item.label}</p>
                      </div>

                      <div className="flex-1">
                        <GroupedIVBar attack={item.ivs.attack} defense={item.ivs.defense} stamina={item.ivs.stamina} showValuesLeft={false} />
                      </div>

                      <div className="ml-3">
                        <p className="text-sm font-semibold text-red-600">CP: {item.cp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </PageContainer>
  );
}

type IvExataInputProps = {
  campo: keyof IVsGO;
  label: string;
  valor: number;
  texto: string;
  onDigitar: (valor: string) => void;
  onFinalizar: () => void;
  onAjustar: (delta: number) => void;
};

function IvExataInput({
  campo,
  label,
  valor,
  texto,
  onDigitar,
  onFinalizar,
  onAjustar,
}: IvExataInputProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-zinc-600">{label}</label>

      <div className="flex items-center gap-1.5">
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          disabled={valor <= 0}
          onClick={() => onAjustar(-1)}
          className="border-black/10 bg-white text-black hover:bg-zinc-50"
        >
          −
        </Button>

        <Input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={texto}
          onChange={(event) => onDigitar(event.target.value)}
          onBlur={onFinalizar}
          className="w-14 text-center"
        />

        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          disabled={valor >= 15}
          onClick={() => onAjustar(1)}
          className="border-black/10 bg-white text-black hover:bg-zinc-50"
        >
          +
        </Button>
      </div>

      <GroupedIVBar
        attack={campo === "attack" ? valor : 0}
        defense={campo === "defense" ? valor : 0}
        stamina={campo === "stamina" ? valor : 0}
        showValuesLeft={false}
      />
    </div>
  );
}
