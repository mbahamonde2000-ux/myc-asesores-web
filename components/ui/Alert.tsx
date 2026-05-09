import { AlertCircle, CheckCircle } from "lucide-react";

interface Props {
  type?: "error" | "success";
  message: string;
}

export default function Alert({ type = "error", message }: Props) {
  return (
    <div
      style={{
        backgroundColor: type === "error" ? "#7f1d1d" : "#14532d",
        borderColor: type === "error" ? "#ef4444" : "#22c55e",
        color: "#ffffff",
      }}
      className="flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm font-medium"
    >
      {type === "error" ? (
        <AlertCircle size={18} className="mt-0.5 shrink-0" />
      ) : (
        <CheckCircle size={18} className="mt-0.5 shrink-0" />
      )}

      <span>{message}</span>
    </div>
  );
}