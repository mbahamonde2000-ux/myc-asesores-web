"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight } from "lucide-react";

export default function SeccionClientesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.09),transparent_18%),radial-gradient(circle_at_left,rgba(255,255,255,0.05),transparent_22%),linear-gradient(to_bottom,#0a0a0a,#121212,#0a0a0a)]" />

      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-5 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl text-center rounded-[2rem] border border-white/10 bg-neutral-900/70 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-10 lg:p-12"
        >
          <div className="mb-6 inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-300 mx-auto">
            <ShieldCheck className="h-4 w-4" />
            Acceso privado MyC Asesores
          </div>

          <h1 className="text-4xl font-black leading-tight sm:text-5xl">
            Sección Clientes
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-neutral-300 sm:text-lg">
            Accede al portal privado de MyC Asesores para revisar documentación,
            archivos asociados a tu servicio e información disponible según tu perfil
            de acceso.
          </p>

          <p className="mt-4 text-sm text-neutral-400 sm:text-base">
            Acceso exclusivo para clientes y usuarios autorizados.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 font-semibold text-black transition hover:-translate-y-0.5 hover:bg-neutral-200"
            >
              Ingresar al portal
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              Volver al inicio
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}