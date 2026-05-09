import { NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";
import prisma from "@/lib/prisma";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Correo requerido" },
        { status: 400 }
      );
    }

    const user = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ ok: true });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

    await prisma.passwordResetToken.deleteMany({
      where: {
        usuarioId: user.idUsuario,
      },
    });

    await prisma.passwordResetToken.create({
      data: {
        usuarioId: user.idUsuario,
        email: user.email,
        token,
        expiresAt,
      },
    });

    const resetUrl = `${process.env.APP_URL}/reset-password?token=${token}`;

    console.log("RESEND_API_KEY cargada:", process.env.RESEND_API_KEY?.slice(0, 8)); //prueba temporal

    const { error } = await resend.emails.send({
      from:
        process.env.RESET_EMAIL_FROM ||
        "MyC Asesores <onboarding@resend.dev>",
      to: [user.email],
      subject: "Recuperación de contraseña - MyC Asesores",
html: `
  <div style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif;color:#18181b;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f4f5;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #e4e4e7;">
            
            <tr>
              <td style="background:#111827;padding:28px 32px;color:#ffffff;">
                <div style="font-size:13px;letter-spacing:0.12em;text-transform:uppercase;color:#d1d5db;">
                  MyC Asesores
                </div>
                <h1 style="margin:10px 0 0;font-size:24px;line-height:1.3;font-weight:700;">
                  Recuperación de contraseña
                </h1>
              </td>
            </tr>

            <tr>
              <td style="padding:32px;">
                <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#3f3f46;">
                  Hola,
                </p>

                <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#3f3f46;">
                  Recibimos una solicitud para restablecer tu contraseña en el portal de clientes de MyC Asesores.
                </p>

                <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#3f3f46;">
                  Haz clic en el siguiente botón para crear una nueva contraseña. Este enlace estará disponible durante 30 minutos.
                </p>

                <div style="text-align:center;margin:32px 0;">
                  <a href="${resetUrl}" style="display:inline-block;background:#111827;color:#ffffff;text-decoration:none;padding:14px 24px;border-radius:12px;font-size:15px;font-weight:700;">
                    Restablecer contraseña
                  </a>
                </div>

                <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:14px;padding:16px;margin:24px 0;">
                  <p style="margin:0;font-size:13px;line-height:1.6;color:#52525b;">
                    Si el botón no funciona, copia y pega este enlace en tu navegador:
                  </p>
                  <p style="margin:10px 0 0;font-size:12px;line-height:1.6;color:#2563eb;word-break:break-all;">
                    ${resetUrl}
                  </p>
                </div>

                <p style="margin:24px 0 0;font-size:14px;line-height:1.7;color:#71717a;">
                  Si no solicitaste este cambio, puedes ignorar este correo. Tu contraseña actual seguirá siendo válida.
                </p>
              </td>
            </tr>

            <tr>
              <td style="background:#fafafa;border-top:1px solid #e5e7eb;padding:22px 32px;">
                <p style="margin:0;font-size:12px;line-height:1.6;color:#71717a;">
                  MyC Asesores · Consultoría estratégica, financiera y tecnológica para pymes
                </p>
                <p style="margin:6px 0 0;font-size:12px;line-height:1.6;color:#a1a1aa;">
                  Este es un correo automático, por favor no responder.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </div>
`,
    });

    if (error) {
      console.error("Error enviando correo:", error);
      return NextResponse.json(
        { error: "No fue posible enviar el correo." },
        { status: 500 }
      );
    }

    console.log("RESET URL:", resetUrl);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error forgot-password:", error);

    return NextResponse.json(
      { error: "Error procesando recuperación" },
      { status: 500 }
    );
  }
}