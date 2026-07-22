const fs = require('fs');
const path = require('path');

const STUDIO_PATH = path.resolve(process.cwd(), 'data', 'studio.json');
const BACKUP_PATH = path.resolve(process.cwd(), 'data', `studio.json.bak-${Date.now()}`);
const GOSTATS_PATH = path.resolve(process.cwd(), 'data', 'goStats.json');

// CPM values needed (level 20 and 25) taken from project constants
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

function run() {
  if (!fs.existsSync(STUDIO_PATH)) {
    console.error('Arquivo não encontrado:', STUDIO_PATH);
    process.exit(1);
  }
  if (!fs.existsSync(GOSTATS_PATH)) {
    console.error('goStats.json não encontrado:', GOSTATS_PATH);
    process.exit(1);
  }

  fs.copyFileSync(STUDIO_PATH, BACKUP_PATH);
  console.log('Backup criado em', BACKUP_PATH);

  const studio = loadJson(STUDIO_PATH);
  const goStats = loadJson(GOSTATS_PATH);
  const modified = [];

  for (const numeroKey of Object.keys(studio)) {
    const entry = studio[numeroKey];
    if (!entry) continue;
    if (!entry.go) entry.go = {};
    if (!entry.go.hundos) entry.go.hundos = {};
    if (!entry.go.quaseHundos) entry.go.quaseHundos = {};

    const dexNr = Number(String(numeroKey).replace('#', ''));
    if (!dexNr) continue;
    const base = goStats[String(dexNr)];
    if (!base) continue; // skip forms/megax not present

    const calculated = {
      semClima: calcCP(base, { atk: 15, def: 15, sta: 15 }, 20),
      comClima: calcCP(base, { atk: 15, def: 15, sta: 15 }, 25),
      iv98: calcCP(base, { atk: 15, def: 15, sta: 14 }, 20),
      iv96: calcCP(base, { atk: 15, def: 14, sta: 14 }, 20),
    };

    let changed = false;

    // Hundos (sobrescrever sempre para aplicar a fórmula atual)
    if (entry.go.hundos.semClima !== calculated.semClima) {
      entry.go.hundos.semClima = calculated.semClima;
      changed = true;
    }
    if (entry.go.hundos.comClima !== calculated.comClima) {
      entry.go.hundos.comClima = calculated.comClima;
      changed = true;
    }

    // Quase hundos (sobrescrever sempre)
    if (entry.go.quaseHundos.iv98 !== calculated.iv98) {
      entry.go.quaseHundos.iv98 = calculated.iv98;
      changed = true;
    }
    if (entry.go.quaseHundos.iv96 !== calculated.iv96) {
      entry.go.quaseHundos.iv96 = calculated.iv96;
      changed = true;
    }

    if (changed) modified.push({ numero: numeroKey, valores: calculated });
  }

  if (modified.length === 0) {
    console.log('Nenhuma entrada foi modificada.');
    process.exit(0);
  }

  saveJson(STUDIO_PATH, studio);
  console.log(`Arquivo atualizado. ${modified.length} entradas modificadas.`);
  console.log('Exemplos (até 10):');
  for (const m of modified.slice(0, 10)) {
    console.log(`${m.numero}: semClima=${m.valores.semClima}, comClima=${m.valores.comClima}, iv98=${m.valores.iv98}, iv96=${m.valores.iv96}`);
  }
}

run();
