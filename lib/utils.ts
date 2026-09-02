import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Ganti spasi dengan tanda -
    .replace(/&/g, "and") // Ganti simbol & jadi "and"
    .replace(/[^\w\-]+/g, "") // Hapus karakter khusus/simbol non-word
    .replace(/\-\-+/g, "-"); // Ganti tanda - ganda/beruntun jadi tunggal
}
