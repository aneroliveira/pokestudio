const fs = require('fs');
const path = require('path');

const INDEX_PATH = path.resolve(process.cwd(), 'data', 'pokemonIndex.json');
const STUDIO_PATH = path.resolve(process.cwd(), 'data', 'studio.json');
const BACKUP_PATH = path.resolve(process.cwd(), 'data', `studio.json.bak-${Date.now()}`);
const GOSTATS_PATH = path.resolve(process.cwd(), 'data', 'goStats.json');

const CPM = {
  20: 0.59740001,
  25: 0.667934,
};

function calcCP(base, ivs, nivel) {
  const cpm = CPM[nivel];
  if (!cpm) return 0;
  const atk = base.attack + ivs.atk;
  const def = base.defense + ivs.def;
  const sta = base.stamina + ivs.sta;
  return Math.floor((atk * Math.sqrt(def) * Math.sqrt(sta) * cpm * cpm) / 10);
}

function loadJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf-8'));
}

function saveJson(p, obj) {
  fs.writeFileSync(p, JSON.stringify(obj, null, 2), 'utf-8');
}

function minimalStudio() {
  return {
    estrategia: { tier: 'C', funcao: 'Versátil', melhorPara: [] },
    conhecimento: { decisoes: [], observacoes: [], sinergias: [] },
    go: {
      estado: { tipo: 'Nenhum', valeInvestir: false, motivo: '' },
      shadow: { possuiShadow: false, recomendadoPurificar: false },
      buddy: { necessario: false, objetivo: '' },
      hundos: {},
      quaseHundos: {},
    },
  };
}

function run() {
  if (!fs.existsSync(INDEX_PATH)) {
    console.error('pokemonIndex.json não encontrado:', INDEX_PATH);
    process.exit(1);
  }
  if (!fs.existsSync(GOSTATS_PATH)) {
    console.error('goStats.json não encontrado:', GOSTATS_PATH);
    process.exit(1);
  }

  const index = loadJson(INDEX_PATH);
  const goStats = loadJson(GOSTATS_PATH);
  const studio = fs.existsSync(STUDIO_PATH) ? loadJson(STUDIO_PATH) : {};

  fs.copyFileSync(STUDIO_PATH, BACKUP_PATH);
  console.log('Backup criado em', BACKUP_PATH);

  const modified = [];
  const created = [];
  const skipped = [];

  for (const item of index) {
    const numero = item.numero; // e.g. "#001"
    const dexNr = Number(String(numero || '').replace('#', ''));
    if (!dexNr) {
      skipped.push({ numero, reason: 'numero inválido' });
      continue;
    }

    const base = goStats[String(dexNr)];
    if (!base) {
      skipped.push({ numero, reason: 'sem base stats' });
      continue;
    }

    if (!studio[numero]) {
      studio[numero] = minimalStudio();
      created.push(numero);
    }

    if (!studio[numero].go) studio[numero].go = minimalStudio().go;
    if (!studio[numero].go.hundos) studio[numero].go.hundos = {};
    if (!studio[numero].go.quaseHundos) studio[numero].go.quaseHundos = {};

    const calculated = {
      semClima: calcCP(base, { atk: 15, def: 15, sta: 15 }, 20),
      comClima: calcCP(base, { atk: 15, def: 15, sta: 15 }, 25),
      iv98: calcCP(base, { atk: 15, def: 15, sta: 14 }, 20),
      iv96: calcCP(base, { atk: 15, def: 14, sta: 14 }, 20),
    };

    const prev = { ...studio[numero].go.hundos, ...studio[numero].go.quaseHundos };

    let changed = false;
    // Overwrite values to match calculation
    if (studio[numero].go.hundos.semClima !== calculated.semClima) {
      studio[numero].go.hundos.semClima = calculated.semClima;
      changed = true;
    }
    if (studio[numero].go.hundos.comClima !== calculated.comClima) {
      studio[numero].go.hundos.comClima = calculated.comClima;
      changed = true;
    }
    if (studio[numero].go.quaseHundos.iv98 !== calculated.iv98) {
      studio[numero].go.quaseHundos.iv98 = calculated.iv98;
      changed = true;
    }
    if (studio[numero].go.quaseHundos.iv96 !== calculated.iv96) {
      studio[numero].go.quaseHundos.iv96 = calculated.iv96;
      changed = true;
    }

    if (changed) modified.push({ numero, calculated, prev });
  }

  saveJson(STUDIO_PATH, studio);

  console.log(`Entrada total no index: ${index.length}`);
  console.log(`Criadas: ${created.length}`);
  console.log(`Modificadas: ${modified.length}`);
  console.log(`Puladas (sem base stats ou inválidas): ${skipped.length}`);

  if (modified.length > 0) {
    console.log('Exemplos de modificações (até 10):');
    for (const m of modified.slice(0, 10)) {
      console.log(`${m.numero}: semClima=${m.calculated.semClima}, comClima=${m.calculated.comClima}, iv98=${m.calculated.iv98}, iv96=${m.calculated.iv96}`);
    }
  }

  if (created.length > 0) console.log('Algumas entradas novas foram criadas no studio.json.');
  console.log('Pronto.');
}

run();
