import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET clientes
export async function GET() {
  const clientes = await prisma.cliente.findMany({
    include: {
      estado: true,
      tipoEmpresaLegal: true,
      riesgo: true,
      relacionComercial: true,
      tamanoEmpresa: true,
    },
  });

  return NextResponse.json(clientes);
}

// POST crear cliente
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const cliente = await prisma.cliente.create({
      data: {
        rut: body.rut,
        dv: body.dv,
        razonSocial: body.razonSocial,
        nomFantasia: body.nomFantasia,

        idEmpresaLegal: body.idEmpresaLegal,
        idEstadoCliente: body.idEstadoCliente,
        idRiesgoCliente: body.idRiesgoCliente,
        idRelacionComercial: body.idRelacionComercial,
        idTamEmpresa: body.idTamEmpresa,

        vigente: true,
        usuarioMod: "admin",
      },
    });

    return NextResponse.json(cliente);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error creando cliente" }, { status: 500 });
  }
}