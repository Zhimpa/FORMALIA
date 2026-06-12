interface AdvertenciaProps {
  children: React.ReactNode;
  titulo?: string;
}

export function Advertencia({ children, titulo }: AdvertenciaProps) {
  return (
    <div className="my-4 flex gap-3 rounded-lg border-l-4 border-advertencia-400 bg-advertencia-50 p-4 text-sm leading-relaxed">
      <svg
        className="mt-0.5 h-5 w-5 shrink-0 text-advertencia-500"
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
          clipRule="evenodd"
        />
      </svg>
      <div className="text-advertencia-900">
        {titulo && <p className="mb-1 font-semibold">{titulo}</p>}
        {children}
      </div>
    </div>
  );
}
