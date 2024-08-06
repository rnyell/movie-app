import { motion } from "framer-motion"
import { overlayMotion } from "@lib/motion/motions"

import cls from "@lib/ui/cls"
import classes from "./overlay.module.css"


export function Container({ children, variant, customStyles }) {
  return (
    <motion.div
      className={cls(classes, ["container"], customStyles)}
      data-variant={variant}
      {...overlayMotion}
    >
      {children}
    </motion.div>
  )
}

export function Header({ children, customStyles }) {
  return (
    <motion.div
      className={cls(classes, ["header"], customStyles)}
      initial={{y: -5}}
      animate={{y: 0}}
      exit={{y: -5}}
    >
      {children}
    </motion.div>
  )
}

export function Details({ children, customStyles }) {
  return (
    <motion.div
      className={cls(classes, ["details"], customStyles)}
      initial={{y: -6.5}}
      animate={{y: 0}}
      exit={{y: -6.5}}
    >
      {children}
    </motion.div>
  )
}

export function Actions({ children, customStyles }) {
  return (
    <motion.div
      className={cls(classes, ["actions"], customStyles)}
      initial={{y: 10}}
      animate={{y: 0}}
      exit={{y: 10}}
    >
      {children}
    </motion.div>
  )
}
