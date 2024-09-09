import { motion } from "framer-motion"
import { pageTransitionMotion } from "@lib/motion/motions"
import cn from "@lib/ui/cn"

export default function Page({
  children,
  className,
  headless = false,
  viewTransition = false
}) {
  const Element = viewTransition ? motion.div : "div"
  const pageMotion = viewTransition ? pageTransitionMotion : {}
  const predef = headless ? "" : "pt-6 pb-4 px-8 flex-col"

  return (
    <Element className={cn(predef, className)} {...pageMotion}>
      {children}
    </Element>
  )
}
