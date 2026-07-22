import fs from 'fs';
import path from 'path';

const STUDIO_PATH = path.resolve(process.cwd(), 'data', 'studio.json');
const BACKUP_PATH = path.resolve(process.cwd(), 'data', `studio.json.bak-${Date.now()}`);

function loadStudio() {
  const raw = fs.readFileSync(STUDIO_PATH, 'utf-8');
  return JSON.parse(raw);
}

function saveStudio(obj) {
  fs.writeFileSync(STUDIO_PATH, JSON.stringify(obj, null, 2), 'utf-8');
}

function run() {
  if (!fs.existsSync(STUDIO_PATH)) {
    console.error('Arquivo não encontrado:', STUDIO_PATH);
    process.exit(1);
  }

  // backup
  fs.copyFileSync(STUDIO_PATH, BACKUP_PATH);
  console.log('Backup criado em', BACKUP_PATH);

  const studio = loadStudio();
  const modified = [];

  for (const numero of Object.keys(studio)) {
    const entry = studio[numero];
    if (!entry || !entry.go) continue;

    let changed = false;

    const hundos = entry.go.hundos;
    if (hundos) {
      if (Object.prototype.hasOwnProperty.call(hundos, 'semClima') && hundos.semClima === 0) {
        delete hundos.semClima;
        changed = true;
      }
      if (Object.prototype.hasOwnProperty.call(hundos, 'comClima') && hundos.comClima === 0) {
        delete hundos.comClima;
        changed = true;
      }
    }

    const quase = entry.go.quaseHundos;
    if (quase) {
      if (Object.prototype.hasOwnProperty.call(quase, 'iv98') && quase.iv98 === 0) {
        delete quase.iv98;
        changed = true;
      }
      if (Object.prototype.hasOwnProperty.call(quase, 'iv96') && quase.iv96 === 0) {
        delete quase.iv96;
        changed = true;
      }
    }

    if (changed) modified.push(numero);
  }

  if (modified.length === 0) {
    console.log('Nenhuma entrada precisava de limpeza.');
    process.exit(0);
  }

  saveStudio(studio);
  console.log(`Arquivo atualizado. Registros modificados: ${modified.length}`);
  console.log('Registros:', modified.join(', '));
}

run();
