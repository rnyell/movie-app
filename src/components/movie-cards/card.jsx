import { forwardRef } from "react"
import { motion } from "framer-motion"
import { useWindowOffsets } from "@lib/hooks"

import cls from "@lib/ui/cls"
import classes from "./card.module.css"
import "./movie-card.css"


export const Container = forwardRef((props, ref) => {
  const { children, variant, isMotion, customStyles, ...rest } = props
  const DivElement = isMotion ? motion.div : "div"

  const { windowWidth } = useWindowOffsets()
  const isTouchDevice = windowWidth <= 520

  return (
    <DivElement
      className={cls(classes, ["container"], customStyles)}
      data-variant={variant}
      data-screen={isTouchDevice ? "small" : "large"}
      ref={ref}
      {...rest}
    >
      {children}
    </DivElement>
  )
})

export function Figure({
  children,
  src,
  customStyles,
  isMotion,
  ...props
}) {
  const DivElement = isMotion ? motion.div : "div"

  return (
    <DivElement className={cls(classes, ["cardFigure"], customStyles)} {...props}>
      <figure>
        <img
          className={cls(classes, ["cardPoster"])}
          src={src}
          draggable={false}
        />
      </figure>
      {children}
    </DivElement>
  )
}

export function Body({ children, customStyles }) {
  return (
    <div className={cls(classes, ["cardBody"], customStyles)}>
      {children}
    </div>
  )
}

export const TouchWidget = forwardRef((props, ref) => {
  const { children, customStyles, ...rest } = props
  const { windowWidth } = useWindowOffsets()
  const isTouchDevice = windowWidth <= 520

  return isTouchDevice && (
    <div
      className={cls(classes, ["touchWidget"], customStyles)}
      ref={ref}
      {...rest}
    >
      {children}
    </div>
  )
})
