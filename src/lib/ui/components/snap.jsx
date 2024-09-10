import { cva, cx } from "cva"
import classes from "./snap.module.css"

const styles = cva(classes.container, {
  variants: {
    direction: {
      x: classes.x,
      y: classes.y,
    },
    strictness: {
      mandatory: classes.mandatory,
      proximity: classes.proximity,
    }
  },
  defaultVariants: {
    direction: "x",
    strictness: "proximity"
  }
})

export function Container({
  children,
  className,
  direction,
  strictness,
  ...rest
}) {
  return (
    <div className={styles({ direction, strictness, className })} {...rest}>
      {children}
    </div>
  )
}

export function Item({
  children,
  className,
  align = "start",
  ...rest
}) {
  return (
    <div className={cx(classes.item, classes[align], className)} {...rest}>
      {children}
    </div>
  )
}
