export const tagMotion = {
  initial: {
    opacity: 0,
    x: -10,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: -15,
  },
}

export const tagTransition = { duration: 0.25 }

export const navLink_styles = `
  py-[0.675rem] px-4 align-center gap-3 relative rounded-xl transition duration-135 text-[min(0.8rem,16px)]
  hover:text-primary-200 hover:bg-primary-900 data-[collapsed=true]:self-center
`

export const navLinkActive_styles = `!text-primary-100 !bg-primary-700`

export const menu_styles = `p-1 z-50 gap-[0.325rem] text-[min(0.8rem,16px)] bg-primary-900 border-1.5 border-solid border-primary-700 rounded-3xl`

export const menuItem_styles = `py-[0.675rem] px-4 align-center gap-3 text-primary-200 rounded-[0.75rem] hover:bg-primary-700`
