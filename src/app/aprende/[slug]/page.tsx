import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getArticulo, getSlugs, getArticulosMetadata } from "@/lib/aprende";
import { NIVEL_LABEL, NIVEL_COLOR } from "@/lib/aprende-ui";
import { getMdxComponents } from "@/components/mdx/MdxComponents";
import { cn } from "@/lib/utils";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const articulo = getArticulo(params.slug);
  if (!articulo) return {};
  return {
    title: articulo.titulo,
    description: articulo.descripcion,
  };
}

export default function PageArticulo({ params }: Props) {
  const articulo = getArticulo(params.slug);
  if (!articulo) notFound();

  const todos = getArticulosMetadata();
  const idx = todos.findIndex((a) => a.slug === params.slug);
  const anterior = idx > 0 ? todos[idx - 1] : null;
  const siguiente = idx < todos.length - 1 ? todos[idx + 1] : null;

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Top bar */}
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-contenido px-4 py-3">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-neutral-500">
            <Link href="/aprende" className="hover:text-neutral-700 transition-colors">
              Aprende
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-neutral-800 font-medium truncate max-w-[200px] sm:max-w-none">
              {articulo.titulo}
            </span>
          </nav>
        </div>
      </div>

      {/* Article */}
      <div className="mx-auto max-w-contenido px-4 py-8">
        <div className="mx-auto max-w-2xl">
          {/* Article header */}
          <header className="mb-8">
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <span className={cn("rounded-full border px-2.5 py-0.5 text-xs font-medium", NIVEL_COLOR[articulo.nivel])}>
                {NIVEL_LABEL[articulo.nivel]}
              </span>
              <span className="flex items-center gap-1 text-xs text-neutral-400">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                {articulo.lecturaMinutos} minutos de lectura
              </span>
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl leading-snug">
              {articulo.titulo}
            </h1>
            <p className="mt-2 text-neutral-500 leading-relaxed">{articulo.descripcion}</p>
            <p className="mt-3 text-xs text-neutral-400">
              Datos vigentes para 2026 · UIT S/ 5,500 · RMV S/ 1,130
            </p>
          </header>

          {/* MDX content */}
          <article className="mb-10">
            <MDXRemote
              source={articulo.contenido}
              components={getMdxComponents()}
            />
          </article>

          {/* Disclaimer */}
          <div className="mb-10 rounded-lg border border-neutral-200 bg-white px-4 py-3 text-xs text-neutral-400">
            Información referencial y educativa. No reemplaza la asesoría de un contador público colegiado. Las normas tributarias cambian — verifica siempre en{" "}
            <a href="https://www.sunat.gob.pe" target="_blank" rel="noopener noreferrer" className="text-marca-500 hover:underline">
              sunat.gob.pe
            </a>{" "}
            antes de tomar decisiones.
          </div>

          {/* Prev / Next navigation */}
          <nav aria-label="Artículos relacionados" className="border-t border-neutral-200 pt-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
              {anterior ? (
                <Link
                  href={`/aprende/${anterior.slug}`}
                  className="group flex items-start gap-3 rounded-xl border border-neutral-200 bg-white p-4 hover:shadow-card-hover transition-shadow sm:max-w-[48%]"
                >
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400 group-hover:text-marca-600 transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                  </svg>
                  <div>
                    <p className="text-xs text-neutral-400 mb-0.5">Anterior</p>
                    <p className="text-sm font-medium text-neutral-800 group-hover:text-marca-700 transition-colors leading-snug">
                      {anterior.titulo}
                    </p>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {siguiente ? (
                <Link
                  href={`/aprende/${siguiente.slug}`}
                  className="group flex items-start gap-3 rounded-xl border border-neutral-200 bg-white p-4 hover:shadow-card-hover transition-shadow sm:max-w-[48%] sm:text-right sm:flex-row-reverse"
                >
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400 group-hover:text-marca-600 transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                  <div>
                    <p className="text-xs text-neutral-400 mb-0.5">Siguiente</p>
                    <p className="text-sm font-medium text-neutral-800 group-hover:text-marca-700 transition-colors leading-snug">
                      {siguiente.titulo}
                    </p>
                  </div>
                </Link>
              ) : (
                <div />
              )}
            </div>

            <div className="mt-4 text-center">
              <Link
                href="/aprende"
                className="text-sm text-neutral-500 hover:text-neutral-700 transition-colors"
              >
                ← Ver todos los artículos
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
