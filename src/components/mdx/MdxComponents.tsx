import type { MDXComponents } from "mdx/types";
import { Tooltip } from "@/components/ui/Tooltip";
import { GlosarioLink } from "@/components/ui/GlosarioLink";
import { Resumen } from "./Resumen";
import { Advertencia } from "./Advertencia";

export function getMdxComponents(): MDXComponents {
  return {
    // Headings
    h1: ({ children }) => (
      <h1 className="mt-8 mb-4 text-2xl font-bold text-neutral-900 first:mt-0">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-8 mb-3 border-b border-neutral-200 pb-2 text-xl font-semibold text-neutral-800">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-6 mb-2 text-lg font-semibold text-neutral-800">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-4 mb-2 text-base font-semibold text-neutral-700">{children}</h4>
    ),

    // Body text
    p: ({ children }) => (
      <p className="mb-4 leading-relaxed text-neutral-700">{children}</p>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-neutral-900">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,

    // Lists
    ul: ({ children }) => (
      <ul className="mb-4 list-disc pl-6 space-y-1 text-neutral-700">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-4 list-decimal pl-6 space-y-1 text-neutral-700">{children}</ol>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,

    // Links
    a: ({ href, children }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-marca-600 underline underline-offset-2 hover:text-marca-800"
      >
        {children}
      </a>
    ),

    // Blockquote
    blockquote: ({ children }) => (
      <blockquote className="my-4 border-l-4 border-marca-300 pl-4 italic text-neutral-600">
        {children}
      </blockquote>
    ),

    // Code
    pre: ({ children }) => (
      <pre className="my-4 overflow-x-auto rounded-xl bg-neutral-900 px-5 py-4 text-sm leading-relaxed text-neutral-100 font-mono">
        {children}
      </pre>
    ),
    code: ({ children, className }) => {
      if (className) {
        // Block code inside pre — no extra styles
        return <code className={className}>{children}</code>;
      }
      // Inline code
      return (
        <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-sm font-mono text-neutral-800">
          {children}
        </code>
      );
    },

    // Tables
    table: ({ children }) => (
      <div className="my-4 overflow-x-auto rounded-xl border border-neutral-200">
        <table className="w-full border-collapse text-sm">{children}</table>
      </div>
    ),
    thead: ({ children }) => <thead className="bg-neutral-50">{children}</thead>,
    tbody: ({ children }) => <tbody>{children}</tbody>,
    tr: ({ children }) => <tr className="border-b border-neutral-100 even:bg-neutral-50/60">{children}</tr>,
    th: ({ children }) => (
      <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-neutral-600">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-2.5 text-neutral-700">{children}</td>
    ),

    // Horizontal rule
    hr: () => <hr className="my-6 border-neutral-200" />,

    // Custom components injected into MDX
    Tooltip,
    GlosarioLink,
    Resumen,
    Advertencia,
  };
}
