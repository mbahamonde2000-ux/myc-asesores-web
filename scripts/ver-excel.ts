import { createRequire } from "module";

const require = createRequire(import.meta.url);
const XLSX = require("xlsx");

const archivo = "data/Maestro de Tablas.xlsx";

const workbook = XLSX.readFile(archivo);

console.log("Hojas encontradas:");
console.log(workbook.SheetNames);

for (const sheetName of workbook.SheetNames) {
  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  console.log("\n----------------------");
  console.log("Hoja:", sheetName);
  console.log("Columnas:", rows[0]);
  console.log("Filas:", rows.length - 1);
}