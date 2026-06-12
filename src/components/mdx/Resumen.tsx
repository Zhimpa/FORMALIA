import { cn } from "@/lib/utils";

interface ResumenProps {
  children: React.ReactNode;
  titulo?: string;
}

export function Resumen({ children, titulo = "En resumen" }: ResumenProps) {
  return (
    <aside className="mt-8 rounded-xl border border-marca-200 bg-marca-50 p-5">
      <div className="mb-3 flex items-center gap-2">
        <svg
          className="h-5 w-5 text-marca-600"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.966 8.966 0 0 0-6 2.292m0-14.25v14.25"
          />
        </svg>
        <span className="text-sm font-bold text-marca-800">{titulo}</span>
      </div>
      <div
        className={cn(
          "text-sm text-neutral-700 leading-relaxed",
          "[&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1",
          "[&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-1",
          "[&>p]:mb-2 [&>p:last-child]:mb-0",
        )}
      >
        {children}
      </div>
    </aside>
  );
}
