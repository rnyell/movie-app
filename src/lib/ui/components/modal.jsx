import { createPortal } from "react-dom"
import { motion } from "framer-motion"
import { modalBackdropMotion, modalMotion } from "@lib/motion/motions"
import cls from "../cls"
import classes from "./modal.module.css"


export default function Modal({
  children,
  setClose,
  variants = "default",
  size
}) {

  return createPortal(
    <>
      <motion.div
        className={cls(classes, ["modalBackdrop"])}
        onClick={setClose}
        {...modalBackdropMotion}
      />
      <motion.div
        className={cls(classes, ["modal", variants, size])}
        {...modalMotion}
      >
        {children}
      </motion.div>
    </>,
    document.getElementById("portal")
  )
}
