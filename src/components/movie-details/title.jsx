import { motion } from "framer-motion"
import cn from "@lib/ui/cn"
import classes from "./title.module.css"

export default function Title({
  title,
  size = "md",
  width = "75%",
  isTruncated = true,
  isMotion = false,
  className = "",
  ...rest
}) {
  const H4Element = isMotion ? motion.h4 : "h4"

  return (
    <H4Element
      className={cn(classes.title, classes[size], className)}
      data-truncate={isTruncated}
      style={{width: `${width}`}}
      {...rest}
    >
      {title}
    </H4Element>
  )
}
