"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Inicio", labelCorto: "Inicio" },
  { href: "/regimen", label: "¿Qué régimen me conviene?", labelCorto: "Mi régimen" },
  { href: "/formalizacion", label: "Formaliza tu empresa", labelCorto: "Formaliza" },
  { href: "/calculadoras", label: "Calculadoras", labelCorto: "Calculadoras" },
  { href: "/aprende", label: "Aprende", labelCorto: "Aprende" },
  { href: "/glosario", label: "Glosario", labelCorto: "Glosario" },
  { href: "/preguntas-frecuentes", label: "Preguntas frecuentes", labelCorto: "FAQ" },
  { href: "/acerca", label: "Acerca de Formalia", labelCorto: "Acerca" },
] as const;

export function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setMenuAbierto(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuAbierto ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuAbierto]);

  const esActiva = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-40 border-b border-marca-900/20 bg-marca-800 shadow-sm will-change-transform">
      <a href="#contenido-principal" className="saltar-contenido">
        Ir al contenido principal
      </a>

      <div className="contenedor">
        <div className="flex h-14 items-center justify-between sm:h-16">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-marca-800"
          >
            <LogoIcono />
            <span className="text-lg font-bold tracking-tight sm:text-xl" aria-label="Formalia">
              <span className="text-white">FORM</span>
              <span className="text-acento-400">ALIA</span>
            </span>
          </Link>

          {/* Navegación escritorio */}
          <nav aria-label="Navegación principal" className="hidden lg:block">
            <ul className="flex items-center gap-1" role="list">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm font-medium no-underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-1 focus-visible:ring-offset-marca-800",
                      esActiva(item.href)
                        ? "bg-white/15 text-white"
                        : "text-white/75 hover:bg-white/10 hover:text-white",
                    )}
                    aria-current={esActiva(item.href) ? "page" : undefined}
                  >
                    {item.labelCorto}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Botón hamburguesa (móvil y tablet) */}
          <button
            type="button"
            onClick={() => setMenuAbierto((o) => !o)}
            aria-expanded={menuAbierto}
            aria-controls="menu-movil"
            aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white lg:hidden"
          >
            {menuAbierto ? <IconoCerrar /> : <IconoMenu />}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      <div
        id="menu-movil"
        className={cn(
          "fixed inset-x-0 top-[3.5rem] z-50 bg-marca-900 transition-all duration-200 sm:top-16 lg:hidden",
          menuAbierto
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0",
        )}
        aria-hidden={!menuAbierto}
      >
        <nav aria-label="Menú de navegación móvil">
          <ul className="contenedor divide-y divide-white/10 py-2" role="list">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMenuAbierto(false)}
                  className={cn(
                    "flex items-center gap-3 py-3.5 text-base font-medium transition-colors",
                    esActiva(item.href) ? "text-white" : "text-white/70 hover:text-white",
                  )}
                  aria-current={esActiva(item.href) ? "page" : undefined}
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 flex-shrink-0 rounded-full",
                      esActiva(item.href) ? "bg-acento-400" : "bg-transparent",
                    )}
                    aria-hidden="true"
                  />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Overlay móvil */}
      {menuAbierto && (
        <div
          className="fixed inset-0 top-[3.5rem] z-40 bg-black/40 sm:top-16 lg:hidden"
          aria-hidden="true"
          onClick={() => setMenuAbierto(false)}
        />
      )}
    </header>
  );
}

// ---------------------------------------------------------------------------
// Logo SVG — F letterform + growth bars/arrow in emerald
// ---------------------------------------------------------------------------

function LogoIcono() {
  return (
    <svg
      className="h-9 w-9 flex-shrink-0"
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      {/* Subtle background */}
      <rect x="0" y="0" width="40" height="40" rx="9" fill="white" fillOpacity="0.1" />

      {/* F letterform (white strokes) */}
      {/* Vertical bar */}
      <line x1="7" y1="5" x2="7" y2="35" stroke="white" strokeWidth="5" strokeLinecap="round" />
      {/* Top horizontal bar */}
      <line x1="7" y1="5" x2="27" y2="5" stroke="white" strokeWidth="5" strokeLinecap="round" />
      {/* Middle horizontal bar */}
      <line x1="7" y1="20" x2="22" y2="20" stroke="white" strokeWidth="4.5" strokeLinecap="round" />

      {/* Growth bars (emerald #10B981) */}
      <rect x="26" y="28" width="4" height="7" rx="2" fill="#10B981" />
      <rect x="32" y="22" width="4" height="13" rx="2" fill="#10B981" />

      {/* Growth arrow (emerald) */}
      <path
        d="M28 18L35 11M31.5 11H35V14.5"
        stroke="#10B981"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function IconoMenu() {
  return (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  );
}

function IconoCerrar() {
  return (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
