export const pageTransitionMotion = {
  initial: {
    opacity: 0.25,
    // y: 1,
    x: 20,
  },
  animate: {
    opacity: 1,
    scale: 1,
    // y: 0,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeIn"
    }
  },
  exit: {
    opacity: 0.15,
    // y: 1,
    x: -20,
    transition: {
      duration: 0.5,
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

export const dropdownMenuMotion = {
  // y = 1 | -1
  initial: (y) => ({
    opacity: 0.5,
    y: y * 20,
  }),
  animate: {
    opacity: 1,
    x: 0,
    y: 0,
  },
  exit: (y) => ({
    opacity: 0,
    y: y * 20,
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

// export const dropdownItemsMotion = {
//   initial: {
//     opacity: 0.5,
//     y: isDesktop ? 25 : -20,
//     x: isDesktop ? 0 : 5,
//   },
//   animate: {
//     opacity: 1,
//     y: 0,
//     x: 0,
//   },
//   exit: {
//     opacity: 0,
//     y: isDesktop ? 25 : -20,
//     x: isDesktop ? 0 : 5,
//   }
// }
