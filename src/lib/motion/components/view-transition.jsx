import { motion } from "framer-motion"
import { pageTransitionMotion } from "@lib/motion/motions"

export function ViewTransition({ children }) {
  return (
    <motion.div {...pageTransitionMotion}>
      {children}
    </motion.div>
  )
}
