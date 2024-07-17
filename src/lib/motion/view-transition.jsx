import { motion } from "framer-motion"
import { pageTransitionVariants } from "@lib/motion/motions"

export default function ViewTransition({ children }) {
  return (
    <motion.div {...pageTransitionVariants}>
      {children}
    </motion.div>
  )
}
