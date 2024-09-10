import { forwardRef } from "react"
import { motion } from "framer-motion"
import { useWindowOffsets } from "@lib/hooks"
import { cx } from "cva"

import classes from "./card.module.css"
import "./movie-card.css"

export const Container = forwardRef((props, ref) => {
  const { children, variant, isMotion, className, ...rest } = props
  const DivElement = isMotion ? motion.div : "div"
  const { windowWidth } = useWindowOffsets()
  const isTouchDevice = windowWidth <= 520

  return (
    <DivElement
      className={cx(classes.card, className)}
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
  className,
  src,
  isMotion,
  ...props
}) {
  const DivElement = isMotion ? motion.div : "div"

  return (
    <DivElement className={cx(classes.cardFigure, className)} {...props}>
      <figure>
        <img className={classes.poster} src={src} draggable={false} />
      </figure>
      {children}
    </DivElement>
  )
}

export function Body({ children, className }) {
  return (
    <div className={cx(classes.cardBody, className)}>
      {children}
    </div>
  )
}

export const TouchWidget = forwardRef((props, ref) => {
  const { children, className, ...rest } = props
  const { windowWidth } = useWindowOffsets()
  const isTouchDevice = windowWidth <= 520

  return isTouchDevice ? (
    <div
      className={cx(classes.touchWidget, className)}
      ref={ref}
      {...rest}
    >
      {children}
    </div>
  ) : null
})
