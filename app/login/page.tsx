"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole, User, ShieldCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import LinkButton from "@/components/ui/LinkButton";
import Alert from "@/components/ui/Alert";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState(""); // aquí va el email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: username.trim(),
          password: password.trim(),
        }),
      });

      if (!res.ok) {
        setError("Usuario o contraseña incorrectos.");
        setLoading(false);
        return;
      }

      const data = await res.json();

      // guardamos sesión simple
      localStorage.setItem("myc_session", JSON.stringify(data));

// redirección por rol
if (data.role.toLowerCase().includes("admin")) {
  window.location.href = "/dashboard/admin";
  return;
}

window.location.href = "/dashboard/cliente";
    } catch (err) {
      setError("Error de conexión con el servidor.");
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

          <h1 className="text-3xl font-black sm:text-4xl">Iniciar sesión</h1>

          <p className="mt-4 text-sm leading-7 text-neutral-400 sm:text-base">
            Ingresa con tus credenciales para acceder al portal según tu perfil.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-4 text-left">

            {/* Usuario (email) */}
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-300">
                Usuario 
              </label>
  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
  <User className="h-4 w-4 text-neutral-400" />

  <Input
    type="text"
    placeholder="Usuario"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
  />
</div>
</div>
            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-300">
                Contraseña
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <LockKeyhole className="h-4 w-4 text-neutral-400" />
                <Input
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="Ingresa tu contraseña"
/>
              </div>
            </div>

{error && <Alert type="error" message={error} />}

                <Button type="submit">
                Ingresar
                </Button> 
          </form>

<div className="mt-6 flex justify-center gap-4">
  <LinkButton href="/" variant="primary">
    ← Volver
  </LinkButton>

  <LinkButton href="/recuperar-password" variant="primary">
    Recuperar contraseña
  </LinkButton>
</div>
       </div>
      </div>
    </main>
  );
}