import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type Params = {
  params: Promise<{
    model: string;
  }>;
};

const modelosPermitidos: Record<string, string> = {
  region: "region",
  provincia: "provincia",
  comuna: "comuna",

  rubro: "rubro",
  subrubro: "subrubro",
  actividad: "actividad",

  clienteestado: "clienteEstado",
  tipoempresalegal: "tipoEmpresaLegal",
  riesgocliente: "riesgoCliente",
  relacioncomercial: "relacionComercial",
  tamanoempresa: "tamanoEmpresa",

  tipodireccion: "tipoDireccion",

  tipotelefono: "tipoTelefono",
  tipocontacto: "tipoContacto",
  estadocontacto: "estadoContacto",

  rol: "rol",
};

const primaryKeys: Record<string, string> = {
  region: "idRegion",
  provincia: "idProvincia",
  comuna: "idComuna",

  rubro: "idRubro",
  subrubro: "idSubrubro",
  actividad: "idActividad",

  clienteestado: "idEstadoCliente",
  tipoempresalegal: "idEmpresaLegal",
  riesgocliente: "idRiesgoCliente",
  relacioncomercial: "idRelacionComercial",
  tamanoempresa: "idTamEmpresa",

  tipodireccion: "idTipoDir",

  tipotelefono: "idTipoTel",
  tipocontacto: "idTipoContacto",
  estadocontacto: "idEstadoCont",

  rol: "idRol",
};

function limpiarDataParaGuardar(
  body: Record<string, any>,
  primaryKey: string
) {
  const data = { ...body };

  delete data[primaryKey];
  delete data.fechaMod;
  delete data.usuarioMod;

  Object.keys(data).forEach((key) => {
    if (data[key] === "") {
      data[key] = null;
    }
  });

  data.fechaMod = new Date();
  data.usuarioMod = "admin";

  return data;
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const { model } = await params;
    const modelKey = model.toLowerCase();

    const prismaModel = modelosPermitidos[modelKey];
    const primaryKey = primaryKeys[modelKey];

    if (!prismaModel || !primaryKey) {
      return NextResponse.json(
        { error: "Modelo no permitido." },
        { status: 400 }
      );
    }

    const delegate = (prisma as any)[prismaModel];

    if (!delegate) {
      return NextResponse.json(
        { error: "Modelo Prisma no encontrado." },
        { status: 400 }
      );
    }

    const data = await delegate.findMany({
      orderBy: {
        [primaryKey]: "asc",
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error GET maestro:", error);

    return NextResponse.json(
      { error: "Error al cargar el maestro." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest, { params }: Params) {
  try {
    const { model } = await params;
    const modelKey = model.toLowerCase();
    const body = await req.json();

    const prismaModel = modelosPermitidos[modelKey];
    const primaryKey = primaryKeys[modelKey];

    if (!prismaModel || !primaryKey) {
      return NextResponse.json(
        { error: "Modelo no permitido." },
        { status: 400 }
      );
    }

    const delegate = (prisma as any)[prismaModel];

    if (!delegate) {
      return NextResponse.json(
        { error: "Modelo Prisma no encontrado." },
        { status: 400 }
      );
    }

    const data = limpiarDataParaGuardar(body, primaryKey);

    const created = await delegate.create({
      data,
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Error POST maestro:", error);

    return NextResponse.json(
      { error: "Error al crear el registro." },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const { model } = await params;
    const modelKey = model.toLowerCase();
    const body = await req.json();

    const prismaModel = modelosPermitidos[modelKey];
    const primaryKey = primaryKeys[modelKey];

    if (!prismaModel || !primaryKey) {
      return NextResponse.json(
        { error: "Modelo no permitido." },
        { status: 400 }
      );
    }

    const id = body[primaryKey];

    if (!id) {
      return NextResponse.json(
        { error: `Falta el identificador ${primaryKey}.` },
        { status: 400 }
      );
    }

    const delegate = (prisma as any)[prismaModel];

    if (!delegate) {
      return NextResponse.json(
        { error: "Modelo Prisma no encontrado." },
        { status: 400 }
      );
    }

    const data = limpiarDataParaGuardar(body, primaryKey);

    const updated = await delegate.update({
      where: {
        [primaryKey]: Number(id),
      },
      data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error PATCH maestro:", error);

    return NextResponse.json(
      { error: "Error al actualizar el maestro." },
      { status: 500 }
    );
  }
}