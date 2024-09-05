import cls from "@lib/ui/cls"

import styles from "./snap.module.css"


export function Container({
  children,
  className,
  direction = "x",
  strictness = "proximity",
  ...props
}) {
  return (
    <div
      className={`${cls(styles, ["container", direction, strictness])} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function Item({
  children,
  className,
  align = "start",
  ...props
}) {
  return (
    <div
      className={`${cls(styles, ["item", align])} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
