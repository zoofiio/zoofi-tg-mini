import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...classLists: clsx.ClassValue[]) {
  return twMerge(clsx(...classLists));
}
