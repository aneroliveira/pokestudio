import fs from 'fs';
import path from 'path';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const STUDIO_PATH = path.resolve(DATA_DIR, 'studio.json');

function listBackups() {
  if (!fs.existsSync(DATA_DIR)) return [];
  const files = fs.readdirSync(DATA_DIR);
  return files
    .filter((f) => f.startsWith('studio.json.bak-'))
    .map((f) => ({ name: f, time: fs.statSync(path.join(DATA_DIR, f)).mtimeMs }))
    .sort((a, b) => b.time - a.time);
}

function printUsage() {
  console.log('Uso: node scripts/revertStudioBackup.js [nome-do-backup]');
  console.log('Se nenhum backup for informado, o script restaura o backup mais recente.');
  console.log('\nBackups disponíveis:');
  const backs = listBackups();
  if (backs.length === 0) {
    console.log('  Nenhum backup encontrado em data/.');
  } else {
    backs.forEach((b) => console.log('  ' + b.name));
  }
}

function run() {
  const arg = process.argv[2];
  const backs = listBackups();
  if (arg === '-h' || arg === '--help') return printUsage();

  if (backs.length === 0) {
    console.error('Nenhum backup encontrado em data/. Nada a reverter.');
    process.exit(1);
  }

  let chosen;
  if (arg) {
    const candidate = path.basename(arg);
    const exists = backs.find((b) => b.name === candidate);
    if (!exists) {
      console.error('Backup informado não encontrado:', candidate);
      printUsage();
      process.exit(1);
    }
    chosen = exists.name;
  } else {
    chosen = backs[0].name; // most recent
  }

  const src = path.join(DATA_DIR, chosen);
  if (!fs.existsSync(src)) {
    console.error('Arquivo de backup não existe:', src);
    process.exit(1);
  }

  // Make an additional timestamped backup of current studio.json before restoring
  if (fs.existsSync(STUDIO_PATH)) {
    const timestamp = Date.now();
    const altBackup = path.join(DATA_DIR, `studio.json.pre-revert-${timestamp}`);
    fs.copyFileSync(STUDIO_PATH, altBackup);
    console.log('Backup da versão atual salvo em', altBackup);
  }

  fs.copyFileSync(src, STUDIO_PATH);
  console.log('Restaurado', chosen, 'para data/studio.json');
}

run();
