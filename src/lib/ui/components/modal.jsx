import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { motion } from "framer-motion"
import {
  modalBackdropMotion,
  modalBackdroptransition,
  modalMotion,
  modalTransition
} from "@lib/motion/motions"
import cn from "@lib/ui/cn"
import cls from "../cls"

import classes from "./modal.module.css"
// clean this customStyles messssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
export default function Modal({
  children,
  setClose,
  variants = "default",
  size,
  customStyles,
  withBackdrop = true,
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
          className={cls(classes, ["modalBackdrop"])}
          onClick={setClose}
          {...modalBackdropMotion}
          transition={modalBackdroptransition}
        />
      )}
      <motion.div
        className={cls(classes, ["modal", variants, size], customStyles)}
        role="dialog"
        tabIndex={0}
        onKeyDown={closeModalOnEscape}
        ref={ref}
        {...modalMotion}
        transition={modalTransition}
      >
        {children}
      </motion.div>
    </>,
    document.getElementById("modal")
  )
}
