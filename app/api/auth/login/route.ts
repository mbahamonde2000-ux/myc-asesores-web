import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import crypto from "crypto";

const SESSION_TIMEOUT = 1000 * 60 * 25; // 25 minutos

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const ip = req.headers.get("x-forwarded-for") || "local";
    const userAgent = req.headers.get("user-agent") || "unknown";

    const user = await prisma.usuario.findUnique({
      where: { email: body.email },
      include: { rol: true },
    });

    if (!user) {
      await prisma.sesionAuditoria.create({
        data: {
          email: body.email,
          resultado: "ERROR",
          ip,
          userAgent,
          detalle: "Usuario no encontrado",
        },
      });

      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
    }

    const isValid = await bcrypt.compare(body.password, user.password);

    if (!isValid || !user.vigente) {
      await prisma.sesionAuditoria.create({
        data: {
          idUsuario: user.idUsuario,
          email: user.email,
          resultado: "ERROR",
          ip,
          userAgent,
          detalle: "Password incorrecto o usuario inactivo",
        },
      });

      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
    }

// Cerrar sesiones activas anteriores del mismo usuario
await prisma.sesionActiva.updateMany({
  where: {
    idUsuario: user.idUsuario,
    activa: true,
  },
  data: {
    activa: false,
    fechaCierre: new Date(),
  },
});

// Crear nueva sesión activa
const token = crypto.randomUUID();

await prisma.sesionActiva.create({
  data: {
    idUsuario: user.idUsuario,
    token,
    email: user.email,
    rol: user.rol.rol,
    ip,
    userAgent,
    activa: true,
  },
});

    await prisma.sesionAuditoria.create({
      data: {
        idUsuario: user.idUsuario,
        email: user.email,
        resultado: "OK",
        ip,
        userAgent,
        detalle: "Login exitoso",
      },
    });

    const sessionData = {
      id: user.idUsuario,
      email: user.email,
      role: user.rol.rol,
      token,
      lastActivity: Date.now(),
    };

    const cookieStore = await cookies();

    cookieStore.set("session", JSON.stringify(sessionData), {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "lax",
      maxAge: SESSION_TIMEOUT / 1000,
    });

    return NextResponse.json({
      id: user.idUsuario,
      email: user.email,
      role: user.rol.rol,
    });
  } catch (error) {
    console.error("Error login:", error);
    return NextResponse.json({ error: "Error en login" }, { status: 500 });
  }
}