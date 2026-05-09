import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
}

export default function Button({
  variant = "primary",
  className = "",
  ...props
}: Props) {
  const base =
    "inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60";

  const variants = {
    primary:
      "border border-white bg-white text-black hover:bg-gray-200",
    secondary:
      "border border-white/20 bg-white/10 text-white hover:bg-white/15",
    ghost:
      "border border-white/10 bg-transparent text-neutral-300 hover:bg-white/10 hover:text-white",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    />
  );
}