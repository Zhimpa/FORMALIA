"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type Variante = "primario" | "secundario" | "fantasma" | "peligro";
type Tamaño = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variante?: Variante;
  tamaño?: Tamaño;
  cargando?: boolean;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
}

type ButtonProps =
  | (ButtonBaseProps & { href: string; target?: string; rel?: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">)
  | (ButtonBaseProps & { href?: never } & React.ButtonHTMLAttributes<HTMLButtonElement>);

const varianteClases: Record<Variante, string> = {
  primario:
    "bg-marca-700 text-white hover:bg-marca-800 active:bg-marca-900 focus-visible:ring-marca-600 shadow-sm",
  secundario:
    "border-2 border-marca-700 text-marca-700 bg-transparent hover:bg-marca-50 active:bg-marca-100 focus-visible:ring-marca-600",
  fantasma:
    "text-marca-700 bg-transparent hover:bg-marca-50 active:bg-marca-100 focus-visible:ring-marca-600",
  peligro:
    "bg-peligro-600 text-white hover:bg-peligro-700 active:bg-peligro-800 focus-visible:ring-peligro-500 shadow-sm",
};

const tamañoClases: Record<Tamaño, string> = {
  sm: "px-3 py-1.5 text-sm rounded-md gap-1.5",
  md: "px-4 py-2 text-base rounded-lg gap-2",
  lg: "px-6 py-3 text-lg rounded-xl gap-2.5",
};

const baseClases =
  "inline-flex items-center justify-center font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

export function Button(props: ButtonProps) {
  const {
    variante = "primario",
    tamaño = "md",
    cargando = false,
    fullWidth = false,
    className,
    children,
    ...rest
  } = props;

  const clases = cn(
    baseClases,
    varianteClases[variante],
    tamañoClases[tamaño],
    fullWidth && "w-full",
    className,
  );

  if ("href" in props && props.href) {
    const { href, target, rel, ...anchorRest } = rest as { href: string; target?: string; rel?: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <Link href={href} target={target} rel={rel} className={clases} {...(anchorRest as object)}>
        {children}
      </Link>
    );
  }

  return (
    <button
      disabled={cargando || (rest as React.ButtonHTMLAttributes<HTMLButtonElement>).disabled}
      className={clases}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {cargando && <SpinnerIcon />}
      {children}
    </button>
  );
}

function SpinnerIcon() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}
