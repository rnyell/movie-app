export const pageTransitionMotion = {
  initial: {
    opacity: 0.25,
    x: 18,
  },
  animate: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 0.375,
      ease: "easeIn"
    }
  },
  exit: {
    opacity: 0.1,
    x: -20,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
}

export const modalMotion = {
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
    opacity: 0
  }
}

export const modalTransition = {
  duration: 0.45,
  ease: "easeOut"
}

export const modalBackdropMotion = {
  initial: {
    opacity: 0.85
  },
  animate: {
    opacity: 1
  },
  exit: {
    opacity: 0.85
  }
}

export const modalBackdroptransition = {
  duration: 0.25
}

export const dropdownMenuMotion = {
  // y = 1 | -1
  initial: (y) => ({
    opacity: 0.5,
    y: y * 10,
  }),
  animate: {
    opacity: 1,
    x: 0,
    y: 0,
  },
  exit: (y) => ({
    opacity: 0,
    y: y * 10,
  }),
}

export const overlayMotion = {
  initial: {
    opacity: 0,
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
