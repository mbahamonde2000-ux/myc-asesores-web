import { ShieldCheck } from "lucide-react";

export default function AuthBadge() {
  return (
    <div className="mx-auto mb-6 inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-300">
      <ShieldCheck className="h-4 w-4" />
      Acceso privado en la plataforma de MyC Asesores
    </div>
  );
}