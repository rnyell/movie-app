import { createPortal } from "react-dom"
import { motion } from "framer-motion"
import { modalBackdropMotion, modalMotion, modalTransition } from "@lib/motion/motions"
import cls from "../cls"
import classes from "./modal.module.css"


export default function Modal({
  children,
  setClose,
  variants = "default",
  size,
  customStyles,
  withBackdrop = true,
}) {

  return createPortal(
    <>
      {withBackdrop && (
        <motion.div
          className={cls(classes, ["modalBackdrop"])}
          onClick={setClose}
          {...modalBackdropMotion}
        />
      )}
      <motion.div
        className={`${cls(classes, ["modal", variants, size])} ${customStyles}`}
        {...modalMotion}
        transition={modalTransition}
      >
        {children}
      </motion.div>
    </>,
    document.getElementById("portal")
  )
}
