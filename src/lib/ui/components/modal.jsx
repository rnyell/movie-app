import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { motion } from "framer-motion"
import {
  modalBackdropMotion,
  modalBackdropTransition,
  modalMotion,
  modalTransition,
} from "@lib/motion/motions"
import { cva } from "cva"
import cn from "../cn"
import classes from "./modal.module.css"

const styles = cva(classes.modal, {
  variants: {
    variant: {
      default: classes.default,
      confirm: classes.confirm,
      showcase: classes.showcase,
    },
    size: {
      sm: classes.sm,
      md: classes.md,
      lg: classes.lg,
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
})

export default function Modal({
  children,
  className,
  variant,
  size,
  setClose,
  withBackdrop = true,
  backdropClassName,
  ...rest
}) {
  const ref = useRef()

  useEffect(() => {
    /* don't know why but it should be first focused in order to `keyDownEvent` work  */
    ref.current.focus()
  }, [])

  function closeModalOnEscape(e) {
    if (e.key === "Escape" || e.code === 27) {
      setClose()
    }
  }

  return createPortal(
    <>
      {withBackdrop && (
        <motion.div
          className={cn(
            "fixed inset-0 z-100 bg-[rgb(35_38_40_/_70%)] blur-[5px]",
            backdropClassName
          )}
          onClick={setClose}
          {...modalBackdropMotion}
          transition={modalBackdropTransition}
        />
      )}
      <motion.div
        className={cn(styles({ variant, size, className }))}
        role="dialog"
        tabIndex={0}
        onKeyDown={closeModalOnEscape}
        ref={ref}
        {...modalMotion}
        transition={modalTransition}
        {...rest}
      >
        {children}
      </motion.div>
    </>,
    document.getElementById("modal")
  )
}
