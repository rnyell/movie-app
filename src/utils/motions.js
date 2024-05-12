// naming: defaultVariantsLabel ?
export const defaultMotionProps = {
  initial: "initial",
  animate: "animate",
  exit: "exit"
}

export const pageInVariants = {
  initial: {
    opacity: 0.65,
    scale: 0.96,
    y: 15,
    x: -10,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    x: 0,
    transition: {
      duration: 0.35,
      ease: "easeIn"
    }
  },
  exit: {
    opacity: 0.65,
    y: 25,
    transition: {
      duration: 0.35,
      ease: "easeOut"
    }
  }
}

export const portraitCardOverlayVariants = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.25,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: "easeIn"
    }
  }
}

export const landCardOverlayVariants = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.25,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: "easeIn"
    }
  }
}
