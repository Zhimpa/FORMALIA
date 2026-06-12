import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Nivel = "basico" | "intermedio" | "avanzado";

export interface ArticuloMeta {
  slug: string;
  titulo: string;
  nivel: Nivel;
  descripcion: string;
  lecturaMinutos: number;
  orden: number;
}

export interface Articulo extends ArticuloMeta {
  contenido: string;
}

const CONTENT_DIR = path.join(process.cwd(), "src/content/aprende");

const NIVEL_ORDEN: Record<Nivel, number> = { basico: 0, intermedio: 1, avanzado: 2 };

export function getArticulosMetadata(): ArticuloMeta[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));

  const articulos: ArticuloMeta[] = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const { data } = matter(raw);
    return {
      slug,
      titulo: data.titulo as string,
      nivel: data.nivel as Nivel,
      descripcion: data.descripcion as string,
      lecturaMinutos: data.lecturaMinutos as number,
      orden: data.orden as number,
    };
  });

  return articulos.sort((a, b) => {
    const nd = NIVEL_ORDEN[a.nivel] - NIVEL_ORDEN[b.nivel];
    return nd !== 0 ? nd : a.orden - b.orden;
  });
}

export function getArticulo(slug: string): Articulo | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    titulo: data.titulo as string,
    nivel: data.nivel as Nivel,
    descripcion: data.descripcion as string,
    lecturaMinutos: data.lecturaMinutos as number,
    orden: data.orden as number,
    contenido: content,
  };
}

export function getSlugs(): string[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export { NIVEL_LABEL, NIVEL_COLOR } from "./aprende-ui";
