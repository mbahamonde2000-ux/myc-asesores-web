import Link from "next/link";

interface Props {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
}

export default function LinkButton({
  href,
  children,
  variant = "primary",
}: Props) {
  const base =
    "inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-bold transition-all duration-200";

  const variants = {
    primary: "bg-white text-black hover:bg-gray-200",
    secondary:
      "border border-white/20 text-white hover:bg-white/10",
    ghost:
      "text-neutral-300 hover:text-white hover:bg-white/10",
  };

  return (
    <Link href={href} className={`${base} ${variants[variant]}`}>
      {children}
    </Link>
  );
}