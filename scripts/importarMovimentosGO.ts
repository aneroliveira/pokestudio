import fs from "node:fs";
import path from "node:path";

console.log("===================================");
console.log(" Importador de Movimentos GO");
console.log("===================================");

const outputPath = path.resolve(
  process.cwd(),
  "data/movimentosGO.ts"
);

const conteudo = `import { MovimentoGO } from "@/models/pokemon";

export const MOVIMENTOS_GO: MovimentoGO[] = [];
`;

fs.writeFileSync(outputPath, conteudo);

console.log(`✔ Arquivo gerado em: ${outputPath}`);