"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { LockKeyhole, ShieldCheck } from "lucide-react";

import Button from "@/components/ui/Button";
import LinkButton from "@/components/ui/LinkButton";
import Input from "@/components/ui/Input";
import Alert from "@/components/ui/Alert";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      setError("Token inválido o ausente.");
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setMensaje("");

    if (!password || !confirmPassword) {
      setError("Debes completar ambos campos.");
      return;
    }

    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "No se pudo cambiar la contraseña.");
        return;
      }

      setMensaje("Contraseña actualizada correctamente.");

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch {
      setError("Error inesperado. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.09),transparent_18%),radial-gradient(circle_at_left,rgba(255,255,255,0.05),transparent_22%),linear-gradient(to_bottom,#0a0a0a,#121212,#0a0a0a)]" />

      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-5 sm:px-6 lg:px-10">
        <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-neutral-900/70 p-8 text-center shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-10">
          <div className="mx-auto mb-6 inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-300">
            <ShieldCheck className="h-4 w-4" />
            Acceso privado en la plataforma de MyC Asesores
          </div>

          <h1 className="text-3xl font-black sm:text-4xl">
            Nueva contraseña
          </h1>

          <p className="mt-4 text-sm leading-7 text-neutral-400 sm:text-base">
            Ingresa tu nueva contraseña para recuperar el acceso a tu cuenta.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4 text-left">
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-300">
                Nueva contraseña
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <LockKeyhole className="h-4 w-4 text-neutral-400" />

                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nueva contraseña"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-300">
                Confirmar contraseña
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <LockKeyhole className="h-4 w-4 text-neutral-400" />

                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirmar contraseña"
                />
              </div>
            </div>

            {error && <Alert type="error" message={error} />}
            {mensaje && <Alert type="success" message={mensaje} />}

            <Button type="submit" disabled={loading || !token}>
              {loading ? "Cambiando..." : "Cambiar contraseña"}
            </Button>
          </form>

          <div className="mt-6 flex justify-center">
            <LinkButton href="/login" variant="primary">
              Volver al login
            </LinkButton>
          </div>
        </div>
      </div>
    </main>
  );
}