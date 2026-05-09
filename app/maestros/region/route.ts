import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const regiones = await prisma.region.findMany({
      orderBy: {
        nro: "asc",
      },
    });

    return NextResponse.json(regiones);
  } catch (error) {
    console.error("Error obteniendo regiones:", error);

    return NextResponse.json(
      { error: "No se pudieron obtener las regiones." },
      { status: 500 }
    );
  }
}