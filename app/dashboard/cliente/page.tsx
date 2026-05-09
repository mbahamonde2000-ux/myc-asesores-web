"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Download,
  FileText,
  Pencil,
  ShieldCheck,
  Briefcase,
  CheckCircle2,
  Clock3,
  PauseCircle,
  Flag,
} from "lucide-react";
import { getSession } from "@/lib/auth";
import DashboardHeader from "@/components/DashboardHeader";

type SessionUser = {
  id: number;
  nombre: string;
  username: string;
  role: "admin" | "usuario" | "cliente";
  clientId?: number | null;
};

type Client = {
  id: number;
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

type ClientDocument = {
  id: number;
  clientId: number;
  nombre: string;
  categoria: string;
  fecha: string;
  archivo: string;
};

type ClientService = {
  id: number;
  clientId: number;
  nombre: string;
  estado: string;
  fechaInicio: string;
  descripcion: string;
};

const CLIENTS_STORAGE_KEY = "myc_clients_v2";
const CLIENT_DOCUMENTS_STORAGE_KEY = "myc_client_documents_v1";
const CLIENT_SERVICES_STORAGE_KEY = "myc_client_services_v1";

export default function DashboardClientePage() {
  const router = useRouter();

  const [user, setUser] = useState<SessionUser | null>(null);
  const [client, setClient] = useState<Client | null>(null);
  const [documents, setDocuments] = useState<ClientDocument[]>([]);
  const [services, setServices] = useState<ClientService[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const session = getSession() as SessionUser | null;

    if (!session || session.role !== "cliente") {
      router.push("/login");
      return;
    }

    setUser(session);

    try {
      const storedClients = localStorage.getItem(CLIENTS_STORAGE_KEY);
      if (storedClients) {
        const parsed = JSON.parse(storedClients) as Client[];
        const found = parsed.find((c) => c.id === session.clientId);
        setClient(found ?? null);
      }

      const storedDocs = localStorage.getItem(CLIENT_DOCUMENTS_STORAGE_KEY);
      if (storedDocs) {
        setDocuments(JSON.parse(storedDocs));
      }

      const storedServices = localStorage.getItem(CLIENT_SERVICES_STORAGE_KEY);
      if (storedServices) {
        setServices(JSON.parse(storedServices));
      }
    } catch (error) {
      console.error("Error al cargar datos del portal cliente:", error);
    }
  }, [router]);

  const clientDocuments = useMemo(() => {
    if (!user?.clientId) return [];
    return documents.filter((d) => d.clientId === user.clientId);
  }, [documents, user]);

  const clientServices = useMemo(() => {
    if (!user?.clientId) return [];
    return services.filter((s) => s.clientId === user.clientId);
  }, [services, user]);

  const getStatusVisual = (estado: string) => {
    switch (estado) {
      case "Activo":
        return {
          icon: <CheckCircle2 className="h-4 w-4" />,
          label: "Activo",
          style: {
            backgroundColor: "#16a34a",
            color: "#ffffff",
          } as React.CSSProperties,
        };

      case "En implementación":
        return {
          icon: <Clock3 className="h-4 w-4" />,
          label: "En implementación",
          style: {
            backgroundColor: "#facc15",
            color: "#111111",
          } as React.CSSProperties,
        };

      case "Pausado":
        return {
          icon: <PauseCircle className="h-4 w-4" />,
          label: "Pausado",
          style: {
            backgroundColor: "#6b7280",
            color: "#ffffff",
          } as React.CSSProperties,
        };

      case "Finalizado":
        return {
          icon: <Flag className="h-4 w-4" />,
          label: "Finalizado",
          style: {
            backgroundColor: "#2563eb",
            color: "#ffffff",
          } as React.CSSProperties,
        };

      default:
        return {
          icon: <Briefcase className="h-4 w-4" />,
          label: estado || "Sin estado",
          style: {
            backgroundColor: "#ffffff",
            color: "#111111",
          } as React.CSSProperties,
        };
    }
  };

  if (!user || !client) return null;

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <DashboardHeader
        title="Portal Cliente"
        userName={user.nombre}
        role="Cliente"
        navItems={[
          { label: "Ficha", href: "#ficha", isPrimary: true },
          { label: "Servicios", href: "#servicios" },
          { label: "Documentos", href: "#documentos" },
        ]}
      />

      <div className="grid gap-4">
        <section className="rounded-[2rem] border border-white/10 bg-neutral-900/70 p-6 shadow-2xl shadow-black/20">
          <div className="flex items-center gap-2 text-sm text-neutral-300">
            <ShieldCheck className="h-4 w-4" />
            Acceso cliente
          </div>

          <h2 className="mt-3 text-3xl font-black">Bienvenido, {user.nombre}</h2>
        </section>

        <section
          id="ficha"
          className="rounded-[2rem] border border-white/10 bg-neutral-900/70 p-5 shadow-2xl shadow-black/20"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Ficha de cliente</h3>

            <button
              onClick={() => setIsEditing(!isEditing)}
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
            >
              <Pencil className="h-4 w-4" />
              {isEditing ? "Cerrar" : "Editar"}
            </button>
          </div>

          <div className="mt-4 grid gap-2 md:grid-cols-2 xl:grid-cols-3">
            {Object.entries(client).map(([key, value]) => {
              if (key === "id") return null;

              return (
                <div
                  key={key}
                  className="rounded-xl border border-white/10 bg-white/5 p-3"
                >
                  <div className="text-xs uppercase tracking-wide text-neutral-400">
                    {key}
                  </div>
                  <div className="mt-1">{value}</div>
                </div>
              );
            })}
          </div>
        </section>

        <section
          id="servicios"
          className="rounded-[2rem] border border-white/10 bg-neutral-900/70 p-5 shadow-2xl shadow-black/20"
        >
          <h3 className="mb-4 text-xl font-bold">Servicios</h3>

          <div className="grid gap-4 lg:grid-cols-3">
            {clientServices.length > 0 ? (
              clientServices.map((service) => {
                const status = getStatusVisual(service.estado);

                return (
                  <div
                    key={service.id}
                    className="rounded-xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <Briefcase className="h-4 w-4 text-white" />

                      <div
                        className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
                        style={status.style}
                      >
                        {status.icon}
                        <span>{status.label}</span>
                      </div>
                    </div>

                    <h4 className="mt-3 font-semibold">{service.nombre}</h4>

                    <p className="mt-1 text-xs text-neutral-500">
                      Inicio: {service.fechaInicio}
                    </p>

                    <p className="mt-2 text-sm text-neutral-400">
                      {service.descripcion}
                    </p>
                  </div>
                );
              })
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 px-4 py-8 text-center text-sm text-neutral-400 lg:col-span-3">
                Aún no hay servicios disponibles para este cliente.
              </div>
            )}
          </div>
        </section>

        <section
          id="documentos"
          className="rounded-[2rem] border border-white/10 bg-neutral-900/70 p-5 shadow-2xl shadow-black/20"
        >
          <h3 className="mb-4 text-xl font-bold">Documentos</h3>

          <div className="space-y-3">
            {clientDocuments.length > 0 ? (
              clientDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4" />
                    <div>
                      <div>{doc.nombre}</div>
                      <div className="text-xs text-neutral-400">
                        {doc.categoria} · {doc.fecha}
                      </div>
                    </div>
                  </div>

                  <a
                    href={doc.archivo}
                    download
                    className="inline-flex items-center gap-2 rounded bg-white px-3 py-1 text-black"
                  >
                    <Download className="h-4 w-4" />
                    Descargar
                  </a>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 px-4 py-8 text-center text-sm text-neutral-400">
                Aún no hay documentos disponibles para este cliente.
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}