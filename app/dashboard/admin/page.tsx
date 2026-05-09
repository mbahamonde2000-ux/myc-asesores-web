"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Database, Plus, Table } from "lucide-react";

import DashboardHeader from "@/components/DashboardHeader";
import Button from "@/components/ui/Button";
import MaestroTableModal from "@/components/admin/MaestroTableModal";
import MaestroEditModal from "@/components/admin/MaestroEditModal";
import Alert from "@/components/ui/Alert";

import {
  getMaestroGroups,
  getMaestrosByGroup,
  type MaestroConfig,
} from "@/lib/config/maestros";

type SessionUser = {
  id: number;
  email: string;
  role: string;
  clientId?: number | null;
};

type MaestroRow = Record<string, string | number | boolean | null>;

export default function AdminDashboard() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<SessionUser | null>(null);

  const [showMaestros, setShowMaestros] = useState(false);
  const [selectedMaestro, setSelectedMaestro] =
    useState<MaestroConfig | null>(null);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  const [rows, setRows] = useState<MaestroRow[]>([]);
  const [loadingTabla, setLoadingTabla] = useState(false);
  const [showTabla, setShowTabla] = useState(false);

  const [rowEditando, setRowEditando] = useState<MaestroRow | null>(null);
  const [modoCreacion, setModoCreacion] = useState(false);

  const [mensajeSistema, setMensajeSistema] = useState("");
  const [errorSistema, setErrorSistema] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("/api/auth/me");
    }, 1000 * 60 * 5);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const res = await fetch("/api/auth/me");

        if (!res.ok) {
          router.push("/login");
          return;
        }

        const session = await res.json();

        if (!session.role || session.role.toLowerCase() !== "admin") {
          router.push("/login");
          return;
        }

        setUser(session);
        setLoading(false);
      } catch {
        router.push("/login");
      }
    };

    loadSession();
  }, [router]);

  const showSuccess = (message: string) => {
    setMensajeSistema(message);
    setErrorSistema("");

    setTimeout(() => {
      setMensajeSistema("");
    }, 3000);
  };

  const showError = (message: string) => {
    setErrorSistema(message);
    setMensajeSistema("");

    setTimeout(() => {
      setErrorSistema("");
    }, 3000);
  };

  const handleVerTabla = async (maestro?: MaestroConfig) => {
    const maestroActual = maestro ?? selectedMaestro;

    if (!maestroActual) {
      return;
    }

    try {
      setSelectedMaestro(maestroActual);
      setLoadingTabla(true);
      setShowTabla(true);

      const res = await fetch(maestroActual.endpoint);

      if (!res.ok) {
        showError(`No se pudo cargar la tabla de ${maestroActual.label}.`);
        return;
      }

      const data = await res.json();
      setRows(data);
    } catch {
      showError("Error de conexión al cargar la tabla.");
    } finally {
      setLoadingTabla(false);
    }
  };

  const handleNuevoMaestro = (maestro: MaestroConfig) => {
    setSelectedMaestro(maestro);

    const emptyRow: MaestroRow = {};

    maestro.fields.forEach((field) => {
      if (field.editable === false) {
        return;
      }

      if (field.type === "boolean") {
        emptyRow[field.key] = true;
      } else {
        emptyRow[field.key] = "";
      }
    });

    setModoCreacion(true);
    setRowEditando(emptyRow);
  };

  const handleSaveMaestro = async (updatedRow: MaestroRow) => {
    if (!selectedMaestro) return;

    try {
      const method = modoCreacion ? "POST" : "PATCH";

      const res = await fetch(
        `/api/admin/maestros/${selectedMaestro.model}`,
        {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedRow),
        }
      );

      if (!res.ok) {
        const error = await res.json();

        throw new Error(
          error.error ||
            `Error al ${modoCreacion ? "crear" : "guardar"} el maestro.`
        );
      }

      const saved = await res.json();

      if (modoCreacion) {
        setRows((prev) => [...prev, saved]);
      } else {
        setRows((prev) =>
          prev.map((row) => {
            const currentId = row[selectedMaestro.primaryKey];
            const updatedId = saved[selectedMaestro.primaryKey];

            return currentId === updatedId ? saved : row;
          })
        );
      }

      setRowEditando(null);
      setModoCreacion(false);

      showSuccess(
        modoCreacion
          ? "Registro creado correctamente."
          : "Registro actualizado correctamente."
      );
    } catch (error) {
      console.error("Error guardando maestro:", error);

      showError(
        modoCreacion
          ? "No se pudo crear el registro."
          : "No se pudo guardar el registro."
      );
    }
  };

  const handleCloseEditModal = () => {
    setRowEditando(null);
    setModoCreacion(false);
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-neutral-950 text-white">
        Cargando...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <DashboardHeader
        title="Panel Administrador"
        userName={user?.email ?? "Administrador"}
        role="Administrador"
        navItems={[]}
      />

      <section className="sticky top-0 z-30 border-b border-white/10 bg-neutral-950/95 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-3">
              <Button
                type="button"
                variant="primary"
                className="w-auto"
                onClick={() => setShowMaestros((prev) => !prev)}
              >
                <span className="flex items-center justify-center gap-2">
                  <Database size={18} />
                  Mantenedor de Maestros
                  <ChevronDown
                    size={18}
                    className={`transition-transform ${
                      showMaestros ? "rotate-180" : ""
                    }`}
                  />
                </span>
              </Button>

              <Button type="button" variant="secondary" className="w-auto">
                Clientes
              </Button>

              <Button type="button" variant="secondary" className="w-auto">
                Facturación
              </Button>
            </div>

            {showMaestros && (
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/20">
                <p className="mb-4 text-sm font-semibold text-neutral-300">
                  Selecciona una categoría de maestros:
                </p>

                <div className="space-y-4">
                  {getMaestroGroups().map((group) => {
                    const isOpen = openGroup === group;

                    return (
                      <div
                        key={group}
                        className="rounded-2xl border border-white/10 bg-white/[0.03]"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenGroup(isOpen ? null : group)}
                          className="flex w-full items-center justify-between px-4 py-3 text-left"
                        >
                          <span className="text-sm font-semibold text-white">
                            {group}
                          </span>

                          <ChevronDown
                            size={16}
                            className={`transition-transform ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {isOpen && (
                          <div className="border-t border-white/10 p-4">
                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                              {getMaestrosByGroup(group).map((maestro) => (
                                <div
                                  key={maestro.model}
                                  className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 transition ${
                                    selectedMaestro?.model === maestro.model
                                      ? "border-white bg-white text-black"
                                      : "border-white/10 bg-neutral-900 text-white"
                                  }`}
                                >
                                  <button
                                    type="button"
                                    onClick={() => setSelectedMaestro(maestro)}
                                    className="flex-1 text-left"
                                  >
                                    <span className="block text-sm font-bold">
                                      {maestro.label}
                                    </span>

                                    <span className="block text-xs opacity-60">
                                      {maestro.model}
                                    </span>
                                  </button>

                                  <div className="flex shrink-0 gap-2">
                                    <button
                                      type="button"
                                      title="Nuevo"
                                      onClick={() =>
                                        handleNuevoMaestro(maestro)
                                      }
                                      className="rounded-full border border-white/10 px-3 py-2 text-xs font-bold hover:bg-white/10"
                                    >
                                      <Plus size={16} />
                                    </button>

                                    <button
                                      type="button"
                                      title="Ver tabla"
                                      onClick={() => handleVerTabla(maestro)}
                                      className="rounded-full border border-white/10 px-3 py-2 text-xs font-bold hover:bg-white/10"
                                    >
                                      <Table size={16} />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-10">
        {!selectedMaestro ? (
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 text-center shadow-2xl shadow-black/20">
            <h1 className="text-2xl font-black">Administrador de maestros</h1>

            <p className="mt-3 text-sm leading-6 text-neutral-400">
              Selecciona un maestro desde la botonera superior para comenzar.
            </p>
          </div>
        ) : (
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/20"></div>
        )}
      </div>

      <div className="fixed bottom-6 left-0 right-0 z-[9999] flex justify-center px-6">
        <div className="flex flex-col gap-3">
          {mensajeSistema && (
            <div className="w-[320px] max-w-md">
              <Alert type="success" message={mensajeSistema} />
            </div>
          )}

          {errorSistema && (
            <div className="w-[320px] max-w-md">
              <Alert type="error" message={errorSistema} />
            </div>
          )}
        </div>
      </div>

      {showTabla && selectedMaestro && (
        <MaestroTableModal
          title={selectedMaestro.label}
          config={selectedMaestro}
          rows={rows}
          loading={loadingTabla}
          onClose={() => setShowTabla(false)}
          onEditRow={(row) => {
            setModoCreacion(false);
            setRowEditando(row);
          }}
        />
      )}

      {rowEditando && selectedMaestro && (
        <MaestroEditModal
          title={`${modoCreacion ? "Nuevo" : "Editar"} ${
            selectedMaestro.label
          }`}
          config={selectedMaestro}
          row={rowEditando}
          onClose={handleCloseEditModal}
          onSave={handleSaveMaestro}
        />
      )}
    </main>
  );
}