"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole, User, ShieldCheck } from "lucide-react";
import { getDashboardByRole, validateUser } from "@/lib/auth";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const user = validateUser(username.trim(), password.trim());

    if (!user) {
      setError("Usuario o contraseña incorrectos.");
      setLoading(false);
      return;
    }

    localStorage.setItem(
      "myc_session",
      JSON.stringify({
        id: user.id,
        nombre: user.nombre,
        username: user.username,
        role: user.role,
      })
    );

    const targetRoute = getDashboardByRole(user.role);
    router.push(targetRoute);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.09),transparent_18%),radial-gradient(circle_at_left,rgba(255,255,255,0.05),transparent_22%),linear-gradient(to_bottom,#0a0a0a,#121212,#0a0a0a)]" />

      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-5 sm:px-6 lg:px-10">
        <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-neutral-900/70 p-8 text-center shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-10">
          <div className="mx-auto mb-6 inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-300">
            <ShieldCheck className="h-4 w-4" />
            Acceso privado MyC Asesores
          </div>

          <h1 className="text-3xl font-black sm:text-4xl">Iniciar sesión</h1>

          <p className="mt-4 text-sm leading-7 text-neutral-400 sm:text-base">
            Ingresa con tus credenciales para acceder al portal según tu perfil.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-4 text-left">
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-300">
                Usuario
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <User className="h-4 w-4 text-neutral-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Ingresa tu usuario"
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-neutral-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-300">
                Contraseña
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <LockKeyhole className="h-4 w-4 text-neutral-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-neutral-500"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-white px-6 py-3.5 font-semibold text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-neutral-500">
            Acceso exclusivo para clientes y usuarios autorizados
          </div>
          <div className="mt-6 flex justify-center">
  <Link
    href="/"
    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
  >
    Volver al inicio
  </Link>
</div>
        </div>
      </div>
    </main>
  );
}