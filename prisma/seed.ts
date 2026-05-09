import { createRequire } from "module";
const require = createRequire(import.meta.url);
const XLSX = require("xlsx");

import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
  host: "localhost",
  port: 3307,
  user: "root",
  password: "root",
  database: "myc_db",
});


const prisma = new PrismaClient({ adapter });

const archivo = "data/Maestro de Tablas.xlsx";
const workbook = XLSX.readFile(archivo);

function regionToNumber(valor: any): number {
  if (!valor) return 0;

  const v = String(valor).toUpperCase().trim();

  const map: any = {
    "I": 1,
    "II": 2,
    "III": 3,
    "IV": 4,
    "V": 5,
    "VI": 6,
    "VII": 7,
    "VIII": 8,
    "IX": 9,
    "X": 10,
    "XI": 11,
    "XII": 12,
    "XIV": 14,
    "XV": 15,
    "XVI": 16,
    "RM": 13,
  };

  return map[v] ?? 0;
}

function getSheet(name: string): any[] {
  const sheet = workbook.Sheets[name];
  return XLSX.utils.sheet_to_json(sheet);
}

function boolSiNo(valor: any): boolean {
  return String(valor ?? "").trim().toUpperCase() === "SI";
}

function excelDate(valor: any): Date {
  if (!valor) return new Date();

  if (valor instanceof Date) return valor;

  if (typeof valor === "number") {
    const parsed = XLSX.SSF.parse_date_code(valor);
    return new Date(parsed.y, parsed.m - 1, parsed.d);
  }

  return new Date(valor);
}

async function main() {
  console.log("🚀 Iniciando carga desde Excel...");

  await prisma.clienteEstado.createMany({
    data: getSheet("TAB_ClienteEstado").map((r) => ({
      idEstadoCliente: Number(r.id_estado_cliente),
      estadoCliente: r.estado_cliente,
      descripcionEstadoCliente: r.descripcion_estado_cliente,
      vigente: boolSiNo(r.vigente),
      fechaMod: excelDate(r.fecha_mod),
      usuarioMod: r.usuario_mod,
    })),
  });

  await prisma.riesgoCliente.createMany({
    data: getSheet("TAB_ClienteRiesgo").map((r) => ({
      idRiesgoCliente: Number(r.id_riesgo_cliente),
      riesgoCliente: r.riesgo_cliente,
      descripcionRiesgoCliente: r.descripcion_riesgo_cliente,
      vigente: boolSiNo(r.vigente),
      fechaMod: excelDate(r.fecha_mod),
      usuarioMod: r.usuario_mod,
    })),
  });

  await prisma.relacionComercial.createMany({
    data: getSheet("TAB_TipoRelacionComercial").map((r) => ({
      idRelacionComercial: Number(r.id_relacion_comercial),
      relacionComercial: r.relacion_comercial,
      descripcionRelacionCliente: r.descripcion_relacion_cliente,
      vigente: boolSiNo(r.vigente),
      fechaMod: excelDate(r.fecha_mod),
      usuarioMod: r.usuario_mod,
    })),
  });

  await prisma.tamanoEmpresa.createMany({
    data: getSheet("TAB_empresa_tamano").map((r) => ({
      idTamEmpresa: Number(r.id_tam_empresa),
      tamEmpresa: r.tam_empresa,
      descripcion: r.descripcion,
      vigente: boolSiNo(r.vigente),
      fechaMod: excelDate(r.fecha_mod),
      usuarioMod: r.usuario_mod,
    })),
  });

  await prisma.tipoEmpresaLegal.createMany({
    data: getSheet("TAB_tipo_empresa_legal").map((r) => ({
      idEmpresaLegal: Number(r.Id_empresa_legal),
      codigo: r.codigo,
      tipoEmpresa: r.tipo_empresa,
      tamano: r.tamano != null ? String(r.tamano) : null,
      descripcion: r.descripcion,
      ley: r.ley != null ? String(r.ley) : null,
      vigente: boolSiNo(r.vigente),
      fechaMod: excelDate(r.fecha_mod),
      usuarioMod: r.usuario_mod,
    })),
  });

  await prisma.tipoDireccion.createMany({
    data: getSheet("TAB_Tipo_Direccion").map((r) => ({
      idTipoDir: Number(r.id_tipo_dir),
      tipoDir: r.Tipo_dir,
      vigente: boolSiNo(r.vigente),
      fechaMod: excelDate(r.fecha_mod),
      usuarioMod: r.usuario_mod,
    })),
  });

  await prisma.tipoTelefono.createMany({
    data: getSheet("TAB_tipo_tel").map((r) => ({
      idTipoTel: Number(r.id_tipo_tel),
      tipoTel: r.tipo_tel,
      vigente: boolSiNo(r.vigente),
      fechaMod: excelDate(r.fecha_mod),
      usuarioMod: r.usuario_mod,
    })),
  });

  await prisma.estadoContacto.createMany({
    data: getSheet("TAB_estado_contacto").map((r) => ({
      idEstadoCont: Number(r.id_estado_cont),
      estadoContacto: r.Estado_contacto,
      fechaMod: excelDate(r.fecha_mod),
      usuarioMod: r.usuario_mod,
    })),
  });

  await prisma.tipoContacto.createMany({
    data: getSheet("TAB_tipo_contacto").map((r) => ({
      idTipoContacto: Number(r.id_tipo_contacto),
      tipoContacto: r.tipo_contacto,
      vigente: boolSiNo(r.vigente),
      fechaMod: excelDate(r.fecha_mod),
      usuarioMod: r.usuario_mod,
    })),
  });

  await prisma.rol.createMany({
    data: getSheet("TAB_roles").map((r) => ({
      idRol: Number(r.id_rol),
      rol: r.rol,
      vigente: boolSiNo(r.vigente),
      fechaMod: excelDate(r.fecha_mod),
      usuarioMod: r.usuario_mod,
    })),
  });

  console.log("✅ Catálogos cargados");

  await prisma.region.createMany({
    data: getSheet("TAB_Region").map((r) => ({
      idRegion: Number(r.id_region),
      nro: regionToNumber(r.nro),
      region: r.region,
      capital: r.capital,
      zona: r.zona,
      vigente: boolSiNo(r.vigente),
      fechaMod: excelDate(r.fecha_mod),
      usuarioMod: r.usuario_mod,
    })),
  });

  await prisma.provincia.createMany({
    data: getSheet("TAB_Provincia").map((r) => ({
      idProvincia: Number(r.id_provincia),
      idRegion: Number(r.id_region),
      provincia: r.provincia,
      vigente: boolSiNo(r.vigente),
      fechaMod: excelDate(r.fecha_mod),
      usuarioMod: r.usuario_mod,
    })),
  });

  await prisma.comuna.createMany({
    data: getSheet("TAB_Comuna").map((r) => ({
      idComuna: Number(r.id_comuna),
      idRegion: Number(r.id_region),
      idProvincia: Number(r.id_provincia),
      comuna: r.comuna,
      vigente: boolSiNo(r.vigente),
      fechaMod: excelDate(r.fecha_mod),
      usuarioMod: r.usuario_mod,
    })),
  });

  console.log("✅ Geografía cargada");

  await prisma.rubro.createMany({
    data: getSheet("TAB_SII_Rubros").map((r) => ({
      idRubro: Number(r.id_rubro),
      rubro: r.rubro,
      vigente: boolSiNo(r.vigente),
      fechaMod: excelDate(r.fecha_mod),
      usuarioMod: r.usuario_mod,
    })),
  });

  await prisma.subrubro.createMany({
    data: getSheet("TAB_SII_Sub_Rubros").map((r) => ({
      idSubrubro: Number(r.id_subrubro),
      idRubro: Number(r.id_rubro),
      subrubro: r.subrubro,
      vigente: boolSiNo(r.vigente),
      fechaMod: excelDate(r.fecha_mod),
      usuarioMod: r.usuario_mod,
    })),
  });

  await prisma.actividad.createMany({
    data: getSheet("TAB_Actividades").map((r) => ({
      idActividad: Number(r.id_actividad),
      idRubro: Number(r.id_rubro),
      idSubrubro: Number(r.id_subrubro),
      codigoSii: String(r.codigo_sii),
      actividad: r.actividad,
      afectoIva: boolSiNo(r.afecto_iva),
      categoria: r.categoria != null ? String(r.categoria) : null,
      palabrasClave: r.palabras_clave != null ? String(r.palabras_clave) : null,
      vigente: boolSiNo(r.vigente),
      fechaMod: excelDate(r.fecha_mod),
      usuarioMod: r.usuario_mod,
    })),
  });

  console.log("✅ SII cargado");
  console.log("🎉 SEED COMPLETADO");
}

main()
  .catch((e) => {
    console.error("❌ Error en seed:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });