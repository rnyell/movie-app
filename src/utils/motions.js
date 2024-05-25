export const defaultVariantsLabel = {
  initial: "initial",
  animate: "animate",
  exit: "exit"
}

export const pageTransitionVariants = {
  initial: {
    opacity: 0.65,
    scale: 0.97,
    y: 12,
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
    opacity: 0.6,
    y: 18,
    x: -10,
    transition: {
      duration: 0.35,
      ease: "easeOut"
    }
  }
}

export const modalVariants = {
  initial: {
    y: -50,
    opacity: 0.65
  },
  animate: {
    y: 0,
    opacity: 1
  },
  exit: {
    y: -75,
    opacity: 0.65
  }
}

export const modalTransition = {
  duration: 0.45,
  ease: "easeOut"
}

export const modalBackdropVariants = {
  initial: {
    opacity: 0.85
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3
    }
  },
  exit: {
    opacity: 0.85,
    transition: {
      duration: 0.3
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
