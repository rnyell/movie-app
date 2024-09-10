import { cva } from "cva"
import Icon from "./icon"

import classes from "./button.module.css"

const styles = cva(classes.button, {
  variants: {
    variant: {
      "solid-primary": classes["solid-primary"],
      "solid-secondary": classes["solid-secondary"],
      "solid-accent": classes["solid-accent"],
      "solid-blured": classes["solid-blured"],
      "outline-lite": classes["outline-lite"],
      "outline-bold": classes["outline-bold"],
      "outline-blured": classes["outline-blured"],
      "ghost": classes.ghost,
      "danger": classes.danger,
    },
    // color: { TODO
    //   primary: classes.primary,
    //   secondary: classes.primary,
    //   accent: classes.accent,
    // },
    size: {
      xs: classes.xs,
      sm: classes.sm,
      md: classes.md,
      lg: classes.lg,
      xl: classes.xl,
    },
  },
  defaultVariants: {
    variant: "solid-primary",
    size: "md"
  }
})

export default function Button({
  children,
  className,
  variant,
  size,
  isSquare = false,
  iconOnly = false,
  iconSize = "md",
  iconFill,
  iconClassname,
  svg,
  type = "button",
  ...rest
}) {
  return (
    <button
      className={styles({ variant, size, className })}
      data-square={isSquare}
      type={type}
      role="button"
      {...rest}
    >
      {iconOnly ? (
        <Icon
          className={iconClassname}
          size={iconSize}
          fill={iconFill}
          svg={svg}
        />
      ) : (
        children
      )}
    </button>
  )
}
