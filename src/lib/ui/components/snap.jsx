import cls from "@lib/ui/cls"

import classes from "./snap.module.css"


export function Container({
  children,
  direction = "x",
  strictness = "proximity",
  customStyles = "",
  ...props
}) {
  return (
    <div
      className={cls(classes, ["container", direction, strictness], customStyles)}
      {...props}
    >
      {children}
    </div>
  )
}

export function Item({
  children,
  align = "start",
  customStyles = "",
  ...props
}) {
  return (
    <div
      className={cls(classes, ["item", align], customStyles)}
      {...props}
    >
      {children}
    </div>
  )
}
