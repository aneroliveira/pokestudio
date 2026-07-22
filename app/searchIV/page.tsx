"use client";

import Image from "next/image";
import Link from "next/link";
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
import { createEmptyPokemon } from "@/utils/createEmptyPokemon";
import { gerarResultadoSearchIv, calcularCp, type IVsGO } from "@/utils/cpCalculator";

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

  const [resultado, setResultado] = useState<ReturnType<typeof gerarResultadoSearchIv> | null>(null);

  const resultados = buscarPokemon(pesquisa);

  // save on changes
  useEffect(() => {
    const payload = {
      cpJogo,
      comClima,
      modoIv,
      ivs: ivsExatas,
    };
    try {
      localStorage.setItem("searchIV:last", JSON.stringify(payload));
    } catch {
      // ignore
    }
  }, [cpJogo, comClima, modoIv, ivsExatas]);

  async function selecionarPokemon(item: ItemIndicePokemon) {
    setPesquisa("");
    setCarregando(true);

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
    if (!pokemonSelecionado?.oficial.statsBase) {
      alert("Selecione um Pokémon com stats base disponíveis.");
      return;
    }

    const cpNumerico = Number(cpJogo);

    if (!Number.isFinite(cpNumerico) || cpNumerico <= 0) {
      alert("Digite um CP válido.");
      return;
    }

    const ivs = modoIv === "iv100" ? IV_100 : ivsExatas;

    const resultadoCalculado = gerarResultadoSearchIv(
      pokemonSelecionado.oficial.statsBase,
      cpNumerico,
      ivs,
      comClima,
    );

    setResultado(resultadoCalculado);
  }

  function atualizarIvs(chave: keyof IVsGO, valor: string) {
    const valorNumerico = Number(valor);
    setIvsExatas((prev) => ({
      ...prev,
      [chave]: Number.isFinite(valorNumerico) ? valorNumerico : 0,
    }));
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
             <Tooltip content={
               <>
                 A estimativa usa a fórmula de CP (stats base + IVs + multiplicador de nível).
                 Para 100% assume 15/15/15; pequenas diferenças de IV podem não alterar o CP por arredondamento.
               </>
             } />
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
                  src={pokemonSelecionado.oficial.imagem ?? "/"}
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
                    Base: Atk {pokemonSelecionado.oficial.statsBase?.attack ?? "—"} • Def {pokemonSelecionado.oficial.statsBase?.defense ?? "—"} • Sta {pokemonSelecionado.oficial.statsBase?.stamina ?? "—"}
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-zinc-700">CP no jogo</label>
                    <Tooltip content={
                      <>
                        CP (Combat Power) é calculado pelo jogo a partir dos stats finais (base + IV) e do multiplicador de nível. Pequenas diferenças de IV podem não alterar o CP visivelmente por causa do arredondamento.
                      </>
                    } />
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
                    <Tooltip content={
                      <>
                        Sem clima assume nível máximo de spawn padrão; Com clima aplica um boost que aumenta o multiplicador de nível e, portanto, o CP.
                      </>
                    } />
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
                    <div className="space-y-2">
                      <label className="text-sm text-zinc-600">Atk IV</label>
                      <div className="flex items-center justify-between">
                        <Input
                          type="number"
                          min={0}
                          max={15}
                          value={ivsExatas.attack}
                          onChange={(event) => atualizarIvs("attack", event.target.value)}
                          className="w-24"
                        />
                        <GroupedIVBar attack={ivsExatas.attack} defense={0} stamina={0} showValuesLeft={false} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-zinc-600">Def IV</label>
                      <div className="flex items-center justify-between">
                        <Input
                          type="number"
                          min={0}
                          max={15}
                          value={ivsExatas.defense}
                          onChange={(event) => atualizarIvs("defense", event.target.value)}
                          className="w-24"
                        />
                        <GroupedIVBar attack={0} defense={ivsExatas.defense} stamina={0} showValuesLeft={false} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-zinc-600">Sta IV</label>
                      <div className="flex items-center justify-between">
                        <Input
                          type="number"
                          min={0}
                          max={15}
                          value={ivsExatas.stamina}
                          onChange={(event) => atualizarIvs("stamina", event.target.value)}
                          className="w-24"
                        />
                        <GroupedIVBar attack={0} defense={0} stamina={ivsExatas.stamina} showValuesLeft={false} />
                      </div>
                    </div>
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
                  <h3 className={`text-3xl font-semibold text-black transition-transform transition-opacity duration-300 ${resultado ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0'}`}>
                    {resultado.nivelEstimado.toFixed(1)}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-600">Baseado no CP informado, clima e modo de IV.</p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500 text-center sm:text-left">
                  Hundo / quase hundo
                </h4>

                {/* if using exact IVs, show a custom row first */}
                {modoIv === "exatas" ? (
                  <>
                    <div className="flex flex-col gap-2 rounded-2xl border border-black/10 bg-white px-3 py-3 mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-16">
                            <p className="text-lg font-semibold text-black tabular-nums">{Math.round(((ivsExatas.attack + ivsExatas.defense + ivsExatas.stamina) / 45) * 100)}%</p>
                            <p className="text-xs text-zinc-500">IVs</p>
                          </div>

                          <div className="flex-1">
                            <GroupedIVBar attack={ivsExatas.attack} defense={ivsExatas.defense} stamina={ivsExatas.stamina} showValuesLeft={false} />
                          </div>

                          <div className="ml-3">
                            <p className="text-sm font-semibold text-red-600">CP: {resultado ? calcularCp(pokemonSelecionado!.oficial.statsBase!, resultado.nivelEstimado, ivsExatas, comClima) : '—'}</p>
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
                        <p className="text-lg font-semibold text-black tabular-nums">{Math.round(((item.ivs.attack + item.ivs.defense + item.ivs.stamina) / 45) * 100)}%</p>
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
