import { twMerge } from "tailwind-merge"
import clsx from "clsx"

export default function cn(...args) {
  return twMerge(clsx(...args))
}
