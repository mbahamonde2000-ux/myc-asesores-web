"use client";

import { Pencil, X } from "lucide-react";
import type { MaestroConfig } from "@/lib/config/maestros";

type MaestroRow = Record<string, string | number | boolean | null>;

type MaestroTableModalProps = {
  title: string;
  config: MaestroConfig;
  rows: MaestroRow[];
  loading: boolean;
  onClose: () => void;
  onEditRow: (row: MaestroRow) => void;
};

export default function MaestroTableModal({
  title,
  config,
  rows,
  loading,
  onClose,
  onEditRow,
}: MaestroTableModalProps) {
  const visibleFields = config.fields.filter(
    (field) => field.visibleInTable !== false
  );

  const formatValue = (value: MaestroRow[string]) => {
    if (typeof value === "boolean") {
      return value ? "Sí" : "No";
    }

    if (value === null || value === undefined || value === "") {
      return "-";
    }

    return String(value);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/60 p-6"
      style={{ zIndex: 2147483647 }}
    >
      <div
        className="flex w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-neutral-950 shadow-2xl"
        style={{
          height: "560px",
        }}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-neutral-900 px-5 py-4">
          <h2 className="text-lg font-bold text-white">{title}</h2>

          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-black transition hover:bg-neutral-200"
          >
            <X size={16} />
            Cerrar
          </button>
        </div>

        <div className="p-4">
          <div
            className="rounded-2xl border border-white/10 bg-white"
            style={{
              height: "390px",
              overflowY: "scroll",
              overflowX: "auto",
            }}
          >
            {loading ? (
              <div className="p-8 text-center text-xs text-neutral-700">
                Cargando datos...
              </div>
            ) : (
              <table className="w-full min-w-[700px] border-collapse text-left text-xs text-black">
                <thead className="sticky top-0 z-10 bg-neutral-950 text-white">
                  <tr>
                    {visibleFields.map((field) => (
                      <th
                        key={field.key}
                        className="border border-neutral-800 px-3 py-2 font-bold"
                      >
                        {field.label}
                      </th>
                    ))}

                    <th className="border border-neutral-800 px-3 py-2 text-right font-bold">
                      Acciones
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white">
                  {rows.map((row, index) => {
                    const rowKey =
                      row[config.primaryKey] ??
                      row[config.displayField] ??
                      index;

                    return (
                      <tr key={String(rowKey)} className="hover:bg-blue-50">
                        {visibleFields.map((field) => (
                          <td
                            key={field.key}
                            className="border border-neutral-300 px-3 py-2"
                          >
                            {formatValue(row[field.key])}
                          </td>
                        ))}

                        <td className="border border-neutral-300 px-3 py-2 text-right">
                          <button
                            type="button"
                            onClick={() => onEditRow(row)}
                            className="rounded-md border border-neutral-300 bg-white p-1.5 text-neutral-700 transition hover:bg-neutral-100 hover:text-black"
                            title="Editar"
                          >
                            <Pencil size={14} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}

            {!loading && rows.length === 0 && (
              <div className="p-8 text-center text-xs text-neutral-700">
                No hay registros para mostrar.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}