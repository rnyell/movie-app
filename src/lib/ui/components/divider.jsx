import { cva } from "cva"
import classes from "./divider.module.css"

const styles = cva(classes.divider, {
  variants: {
    variant: {
      pale: classes.pale,
      lite: classes.lite,
      "semi-bold": classes["semi-bold"],
      bold: classes.bold,
      ghost: classes.ghost,
    },
    width: {
      partial: classes.partial,
      "almost-fill": classes["almost-fill"],
      fill: classes.fill,
    },
    space: {
      sm: classes.sm,
      md: classes.md,
      lg: classes.lg,
    },
    thickness: {
      thin: classes.thin,
      normal: classes.normal,
      thick: classes.thick,
    },
  },
  defaultVariants: {
    variant: "lite",
    width: "partial",
    space: "sm",
    thickness: "normal",
  },
})

const Divider = ({ variant, width, space, thickness, className }) => (
  <hr className={styles({ variant, width, space, thickness, className })} />
)

export default Divider
