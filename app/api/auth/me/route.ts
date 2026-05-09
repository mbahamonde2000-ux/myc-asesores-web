import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const SESSION_TIMEOUT = 1000 * 60 * 25; // 25 min

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const data = JSON.parse(session);

    const sesionActiva = await prisma.sesionActiva.findUnique({
  where: {
    token: data.token,
  },
});

if (!sesionActiva || !sesionActiva.activa) {
  cookieStore.set("session", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  return NextResponse.json(
    { error: "Sesión cerrada o reemplazada" },
    { status: 401 }
  );
}

    // ⏱ validar inactividad
    if (!data.lastActivity || Date.now() - data.lastActivity > SESSION_TIMEOUT) {
      cookieStore.set("session", "", {
        httpOnly: true,
        expires: new Date(0),
        path: "/",
      });

      return NextResponse.json(
        { error: "Sesión expirada por inactividad" },
        { status: 401 }
      );
    }

    // 🔄 renovar actividad automáticamente
    data.lastActivity = Date.now();

    cookieStore.set("session", JSON.stringify(data), {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "lax",
    });

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Sesión inválida" }, { status: 401 });
  }
}