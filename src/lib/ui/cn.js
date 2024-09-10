import { cx } from "cva"
import { twMerge } from "tailwind-merge"

export default function cn(...args) {
  return twMerge(cx(...args))
}
