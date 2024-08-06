import { motion } from "framer-motion"
import cls from "@lib/ui/cls"
import classes from "./title.module.css"

export default function Title({
  title,
  size = "md",
  width = "75%",
  isTruncated = true,
  isMotion = false,
  customStyles = "",
  ...props
}) {
  const H4Element = isMotion ? motion.h4 : "h4"

  return (
    <H4Element
      className={cls(classes, ["title", size], customStyles)}
      data-truncate={isTruncated}
      style={{width: `${width}`}}
      {...props}
    >
      {title}
    </H4Element>
  )
}
