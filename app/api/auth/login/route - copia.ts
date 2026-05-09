import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const user = await prisma.usuario.findUnique({
      where: { email: body.email },
      include: { rol: true },
    });

    const ip = req.headers.get("x-forwarded-for") || "local";
    const userAgent = req.headers.get("user-agent") || "unknown";

    // ❌ usuario no existe
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

      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    // 🔐 validar contraseña
    const isValid = await bcrypt.compare(body.password, user.password);

    if (!isValid) {
      await prisma.sesionAuditoria.create({
        data: {
          idUsuario: user.idUsuario,
          email: user.email,
          resultado: "ERROR",
          ip,
          userAgent,
          detalle: "Password incorrecto",
        },
      });

      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    // ✅ login correcto → auditoría
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

    // 🍪 cookie segura (sesión)
    const cookieStore = await cookies();

const expiresInMs = 1000 * 60 * 25; // 25 minutos

const sessionData = {
  id: user.idUsuario,
  role: user.rol.rol,
  email: user.email,
  lastActivity: Date.now(),
};

cookieStore.set("session", JSON.stringify(sessionData), {
  httpOnly: true,
  secure: false,
  path: "/",
  sameSite: "lax",
});

    return NextResponse.json({
      id: user.idUsuario,
      email: user.email,
      role: user.rol.rol,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error en login" },
      { status: 500 }
    );
  }
}