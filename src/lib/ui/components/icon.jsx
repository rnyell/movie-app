import { cva } from "cva"
import cn from "../cn"

import classes from "./icon.module.css"

const styles = cva(classes.icon, {
  variants: {
    size: {
      xs: classes.xs,
      sm: classes.sm,
      md: classes.md,
      lg: classes.lg,
      xl: classes.xl,
      xxl: classes.xxl,
    },
    fill: {
      none: "",
      fill: classes.fill,
    },
  },
  defaultVariants: {
    size: "md",
    fill: "none",
  },
})

export default function Icon({ className, size, svg, fill, ...rest }) {
  return (
    <i className={cn(styles({ size, fill, className }))} {...rest}>
      {svg}
    </i>
  )
}
