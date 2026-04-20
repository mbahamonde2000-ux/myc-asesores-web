"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Download,
  FileText,
  Pencil,
  ShieldCheck,
  Briefcase,
} from "lucide-react";
import { getSession } from "@/lib/auth";
import DashboardHeader from "@/components/DashboardHeader";

type SessionUser = {
  id: number;
  nombre: string;
  username: string;
  role: "admin" | "usuario" | "cliente";
};

type ClientProfile = {
  razonSocial: string;
  rut: string;
  giro: string;
  contacto: string;
  correo: string;
  telefono: string;
  direccion: string;
  comuna: string;
  ciudad: string;
};

type ServiceItem = {
  id: number;
  nombre: string;
  estado: string;
  fechaInicio: string;
  descripcion: string;
};

type DocumentItem = {
  id: number;
  nombre: string;
  categoria: string;
  fecha: string;
  archivo: string;
};

export default function DashboardClientePage() {
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    const session = getSession();

    if (!session) {
      router.push("/login");
      return;
    }

    if (session.role !== "cliente") {
      router.push("/login");
      return;
    }

    setUser(session);
  }, [router]);

  const clientProfile: ClientProfile = {
    razonSocial: "Cliente Demo SpA",
    rut: "76.123.456-7",
    giro: "Servicios de consultoría y apoyo empresarial",
    contacto: "Mariano Bahamonde",
    correo: "cliente@demo.cl",
    telefono: "+56 9 1234 5678",
    direccion: "Av. Principal 1234",
    comuna: "La Reina",
    ciudad: "Santiago",
  };

  const services: ServiceItem[] = [
    {
      id: 1,
      nombre: "Estructuración financiera",
      estado: "Activo",
      fechaInicio: "01-04-2026",
      descripcion:
        "Ordenamiento financiero, visibilidad de indicadores y apoyo en la toma de decisiones.",
    },
    {
      id: 2,
      nombre: "Gestión y control operativo",
      estado: "Activo",
      fechaInicio: "08-04-2026",
      descripcion:
        "Diseño de procesos, control operativo y mejora de trazabilidad interna.",
    },
    {
      id: 3,
      nombre: "Tecnología y herramientas a medida",
      estado: "En implementación",
      fechaInicio: "15-04-2026",
      descripcion:
        "Apoyo en soluciones tecnológicas adaptadas a la realidad de la empresa.",
    },
  ];

  const documents: DocumentItem[] = [
    {
      id: 1,
      nombre: "Contrato de prestación de servicios",
      categoria: "Contrato",
      fecha: "02-04-2026",
      archivo: "/documentos/cliente-demo/contrato-servicios.pdf",
    },
    {
      id: 2,
      nombre: "Informe inicial de diagnóstico",
      categoria: "Informe",
      fecha: "10-04-2026",
      archivo: "/documentos/cliente-demo/informe-diagnostico.pdf",
    },
    {
      id: 3,
      nombre: "Propuesta de trabajo",
      categoria: "Propuesta",
      fecha: "14-04-2026",
      archivo: "/documentos/cliente-demo/propuesta-trabajo.pdf",
    },
  ];

  if (!user) return null;

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <DashboardHeader
        title="Portal Cliente"
        userName={user.nombre}
        role="Cliente"
        navItems={[
          { label: "Ficha de cliente", href: "#ficha-cliente", isPrimary: true },
          { label: "Servicios contratados", href: "#servicios-contratados" },
          { label: "Documentación", href: "#documentacion" },
        ]}
      />

      <div className="grid gap-4">
        <section className="rounded-[2rem] border border-white/10 bg-neutral-900/70 p-6 shadow-2xl shadow-black/20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-300">
            <ShieldCheck className="h-4 w-4" />
            Acceso privado de cliente
          </div>

          <h2 className="mt-4 text-3xl font-black sm:text-4xl">
            Bienvenido, {user.nombre}
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-400 sm:text-base">
            Desde este portal puedes revisar tu información básica, visualizar
            los servicios contratados y acceder a la documentación asociada a tu
            asesoría.
          </p>
          
        </section>

        <div className="grid gap-4">
          <section
            id="ficha-cliente"
            className="scroll-mt-48 rounded-[2rem] border border-white/10 bg-neutral-900/70 p-5 shadow-2xl shadow-black/20"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-400">
                  Ficha de cliente
                </div>
                <h3 className="mt-2 text-xl font-bold text-white sm:text-2xl">
                  Datos básicos del cliente
                </h3>
              </div>

              <button className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10">
                <Pencil className="h-4 w-4" />
                Editar
              </button>
            </div>

              <div className="mt-6">
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
                <GridItem label="Razón social" value={clientProfile.razonSocial} />
                <GridItem label="RUT" value={clientProfile.rut} />
                <GridItem label="Giro" value={clientProfile.giro} />
                <GridItem label="Contacto" value={clientProfile.contacto} />
                <GridItem label="Correo" value={clientProfile.correo} />
                <GridItem label="Teléfono" value={clientProfile.telefono} />
                <GridItem label="Dirección" value={clientProfile.direccion} />
                <GridItem label="Comuna" value={clientProfile.comuna} />
                <GridItem label="Ciudad" value={clientProfile.ciudad} />
              </div>
            </div>
          </section>

          <section
            id="servicios-contratados"
            className="scroll-mt-48 rounded-[2rem] border border-white/10 bg-neutral-900/70 p-5 shadow-2xl shadow-black/20"
          >
            <h3 className="mb-4 text-xl font-bold">Servicios contratados</h3>

            <div className="grid gap-3 lg:grid-cols-3">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="inline-flex rounded-xl bg-white/10 p-2.5 text-white">
                      <Briefcase className="h-4 w-4" />
                    </div>

                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        service.estado === "Activo"
                          ? "bg-green-500/15 text-green-300"
                          : "bg-yellow-500/15 text-yellow-300"
                      }`}
                    >
                      {service.estado}
                    </span>
                  </div>

                  <h4 className="mt-3 font-semibold">{service.nombre}</h4>
                  <p className="mt-2 text-sm text-neutral-400">
                    {service.descripcion}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section
            id="documentacion"
            className="scroll-mt-48 rounded-[2rem] border border-white/10 bg-neutral-900/70 p-6 shadow-2xl shadow-black/20"
          >
            <h3 className="mb-6 text-2xl font-bold">Documentación</h3>

            <div className="space-y-4">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between rounded-xl border border-white/10 p-4"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-neutral-300" />
                    <span>{doc.nombre}</span>
                  </div>

                  <a
                    href={doc.archivo}
                    download
                    className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black"
                  >
                    <Download className="h-4 w-4" />
                    Descargar
                  </a>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function GridItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/70 shadow-lg shadow-black/10 transition duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:shadow-xl hover:shadow-black/20">
      <div
        style={{ backgroundColor: "#262626" }}
        className="border-b border-white/10 px-4 py-2.5 text-[11px] uppercase tracking-[0.16em] text-neutral-300"
      >
        {label}
      </div>

      <div
        style={{ backgroundColor: "#3a3a3a" }}
        className="px-4 py-3.5 text-sm font-medium leading-6 text-white transition duration-200 group-hover:bg-[#444444]"
      >
        {value}
      </div>
    </div>
  );
}