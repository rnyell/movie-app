import cls from "@lib/ui/cls"
import classes from "./overview.module.css"

export default function Overview({
  text,
  lines = 3,
  fontSize = "fs-md",
  customStyles = "",
}) {
  return (
    <p
      className={cls(classes, ["overview", fontSize], customStyles)}
      style={{ WebkitLineClamp: lines }}
    >
      {text}
    </p>
  )
}
