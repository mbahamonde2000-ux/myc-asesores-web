"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Button from "@/components/ui/Button";
import type { MaestroConfig, MaestroField } from "@/lib/config/maestros";

type MaestroRow = Record<string, string | number | boolean | null>;

type SelectOption = {
  value: string | number;
  label: string;
};

type MaestroEditModalProps = {
  title: string;
  config: MaestroConfig;
  row: MaestroRow;
  onClose: () => void;
  onSave: (row: MaestroRow) => void;
};

export default function MaestroEditModal({
  title,
  config,
  row,
  onClose,
  onSave,
}: MaestroEditModalProps) {
  const [formData, setFormData] = useState<MaestroRow>(row);
  const [selectOptions, setSelectOptions] = useState<
    Record<string, SelectOption[]>
  >({});

  const editableFields = config.fields.filter(
    (field) => field.editable !== false
  );

  useEffect(() => {
    setFormData(row);
  }, [row]);

  useEffect(() => {
    const loadSelectOptions = async () => {
      const selectFields = editableFields.filter(
        (field) => field.type === "select" && field.relation
      );

      if (selectFields.length === 0) {
        return;
      }

      try {
        const entries = await Promise.all(
          selectFields.map(async (field) => {
            const relation = field.relation!;

            const res = await fetch(relation.endpoint);

            if (!res.ok) {
              return [field.key, []] as const;
            }

            const data = (await res.json()) as MaestroRow[];

            const options = data.map((item) => ({
              value: item[relation.valueField] as string | number,
              label: String(item[relation.labelField] ?? ""),
            }));

            return [field.key, options] as const;
          })
        );

        setSelectOptions(Object.fromEntries(entries));
      } catch {
        setSelectOptions({});
      }
    };

    loadSelectOptions();
  }, [config.model]);

  const handleChange = (
    key: string,
    value: string | number | boolean | null
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const renderField = (field: MaestroField) => {
    const value = formData[field.key];

    if (field.type === "boolean") {
      return (
        <label
          key={field.key}
          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4"
        >
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={(e) => handleChange(field.key, e.target.checked)}
          />

          <span className="text-sm font-semibold text-white">
            {field.label}
          </span>
        </label>
      );
    }

    if (field.type === "select" && field.relation) {
      const options = selectOptions[field.key] ?? [];

      return (
        <div key={field.key}>
          <label className="mb-2 block text-sm font-semibold text-neutral-300">
            {field.label}
            {field.required && <span className="ml-1 text-red-300">*</span>}
          </label>

          <select
            value={value === null || value === undefined ? "" : String(value)}
            onChange={(e) =>
              handleChange(
                field.key,
                e.target.value === "" ? null : Number(e.target.value)
              )
            }
            className="w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-white/30"
          >
            <option value="">Selecciona una opción</option>

            {options.map((option) => (
              <option key={String(option.value)} value={String(option.value)}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );
    }

    return (
      <div key={field.key}>
        <label className="mb-2 block text-sm font-semibold text-neutral-300">
          {field.label}
          {field.required && <span className="ml-1 text-red-300">*</span>}
        </label>

        <input
          type={field.type === "number" ? "number" : "text"}
          value={value === null || value === undefined ? "" : String(value)}
          onChange={(e) =>
            handleChange(
              field.key,
              field.type === "number"
                ? e.target.value === ""
                  ? null
                  : Number(e.target.value)
                : e.target.value
            )
          }
          className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition focus:border-white/30"
        />
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/60 p-6"
      style={{ zIndex: 2147483647 }}
    >
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-neutral-950 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 bg-neutral-900 px-5 py-4">
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

        <div className="max-h-[65vh] overflow-y-auto p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            {editableFields.map((field) => renderField(field))}
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-white/10 bg-neutral-900 px-5 py-4">
          <Button
            type="button"
            variant="secondary"
            className="w-auto"
            onClick={onClose}
          >
            Cancelar
          </Button>

          <Button
            type="button"
            variant="primary"
            className="w-auto"
            onClick={() => onSave(formData)}
          >
            Guardar cambios
          </Button>
        </div>
      </div>
    </div>
  );
}