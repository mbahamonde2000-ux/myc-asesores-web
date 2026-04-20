"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "@/lib/auth";
import DashboardHeader from "@/components/DashboardHeader";

type SessionUser = {
  id: number;
  nombre: string;
  username: string;
  role: "admin" | "usuario" | "cliente";
};

export default function DashboardAdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    const session = getSession();

    if (!session) {
      router.push("/login");
      return;
    }

    if (session.role !== "admin") {
      router.push("/login");
      return;
    }

    setUser(session);
  }, [router]);

  if (!user) return null;

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <DashboardHeader
        title="Panel Administrador"
        userName={user.nombre}
        role="Administrador"
      />

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-10">
        <div className="rounded-[2rem] border border-white/10 bg-neutral-900/70 p-6">
          <h2 className="text-2xl font-bold text-white">Bienvenido</h2>
          <p className="mt-3 text-neutral-300">
            Ya ingresaste correctamente como administrador.
          </p>
        </div>
      </section>
    </main>
  );
}