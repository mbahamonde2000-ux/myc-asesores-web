import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: "Datos incompletos." },
        { status: 400 }
      );
    }

    const resetToken = await prisma.passwordResetToken.findFirst({
      where: {
        token,
        expiresAt: {
          gt: new Date(),
        },
      },
      include: {
        usuario: true,
      },
    });

    if (!resetToken) {
      return NextResponse.json(
        { error: "Token inválido o expirado." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.usuario.update({
      where: {
        idUsuario: resetToken.usuarioId,
      },
      data: {
        password: hashedPassword,
      },
    });

    await prisma.passwordResetToken.deleteMany({
      where: {
        usuarioId: resetToken.usuarioId,
      },
    });

    await prisma.sesionActiva.deleteMany({
      where: {
        idUsuario: resetToken.usuarioId,
      },
    });

    return NextResponse.json({
      ok: true,
      message: "Contraseña actualizada correctamente.",
    });
  } catch (error) {
    console.error("Error reset-password:", error);

    return NextResponse.json(
      { error: "Error restableciendo contraseña." },
      { status: 500 }
    );
  }
}