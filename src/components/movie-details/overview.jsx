import cn from "@lib/ui/cn"
import classes from "./overview.module.css"

export default function Overview({ text, lines = 3, className }) {
  return (
    <p className={cn(classes.overview, className)} style={{ WebkitLineClamp: lines }}>
      {text}
    </p>
  )
}
