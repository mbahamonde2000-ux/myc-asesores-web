import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (session) {
    try {
      const data = JSON.parse(session);

      if (data.token) {
        await prisma.sesionActiva.updateMany({
          where: {
            token: data.token,
            activa: true,
          },
          data: {
            activa: false,
            fechaCierre: new Date(),
          },
        });
      }
    } catch {
      // ignoramos sesión corrupta
    }
  }

  cookieStore.set("session", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  return NextResponse.json({ ok: true });
}