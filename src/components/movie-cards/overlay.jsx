import { motion } from "framer-motion"
import { overlayMotion } from "@lib/motion/motions"
import { cx } from "cva"
import classes from "./overlay.module.css"


export function Container({ children, variant, className }) {
  return (
    <motion.div
      className={cx(classes.overlay, className)}
      data-variant={variant}
      {...overlayMotion}
    >
      {children}
    </motion.div>
  )
}

export function Header({ children, className }) {
  return (
    <motion.div
      className={cx(classes.header, className)}
      initial={{y: -5}}
      animate={{y: 0}}
      exit={{y: -5}}
    >
      {children}
    </motion.div>
  )
}

export function Details({ children, className }) {
  return (
    <motion.div
      className={cx(classes.details, className)}
      initial={{y: -6.5}}
      animate={{y: 0}}
      exit={{y: -6.5}}
    >
      {children}
    </motion.div>
  )
}

export function Actions({ children, className }) {
  return (
    <motion.div
      className={cx(classes.actions, className)}
      initial={{y: 10}}
      animate={{y: 0}}
      exit={{y: 10}}
    >
      {children}
    </motion.div>
  )
}
