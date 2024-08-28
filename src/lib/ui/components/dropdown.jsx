import { useState, useRef, createContext, useContext, useLayoutEffect } from "react"
// import { createPortal } from "react-dom"
import { motion } from "framer-motion"
import { useClickOutside, useWindowOffsets } from "@lib/hooks"
import { dropdownMenuMotion } from "@lib/motion/motions"
import { Presence } from "@lib/motion"
import cn from "../cn"

const DropdownContext = createContext(null)

function useDropdownContext() {
  return useContext(DropdownContext)
}


const targetClientInitial = {
  width: 0,
  height: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
}

const menuClientInitial = { width: 0, height: 0 }

export function Container({ children, className, ...rest }) {
  const ref = useRef(null)
  const [targetClient, setTargetClient] = useState(targetClientInitial)
  const [isOpen, setOpen] = useState(false)

  useClickOutside(ref, () => setOpen(false))

  const contextValue = {
    isOpen,
    setOpen,
    targetClient,
    setTargetClient
  }

  return (
    <DropdownContext.Provider value={contextValue}>
      <div className={className} ref={ref} {...rest}>
        {children}
      </div>
    </DropdownContext.Provider>
  )
}


export function Trigger({ children, className, ...rest }) {
  const { isOpen, setOpen, setTargetClient } = useDropdownContext()
  const ref = useRef(null)

  function handleClick() {
    const rect = ref.current.getBoundingClientRect()
    setTargetClient({
      width: rect.width,
      height: rect.height,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
    })
    setOpen(!isOpen)
  }

  return (
    <div
      className={cn("cursor-default", className)}
      onClick={handleClick}
      ref={ref}
      {...rest}
    >
      {children}
    </div>
  )
}

export function Menu({
  children,
  className,
  isNested = false,
  position = {v: "bottom", h: null},
  ...rest
}) {
  const { windowHeight } = useWindowOffsets()
  const { isOpen, targetClient } = useDropdownContext()
  const [menuClient, setMenuClient] = useState(menuClientInitial)
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (isOpen) {
      const { width, height }  = ref.current?.getBoundingClientRect()
      setMenuClient({ ...menuClient, width, height })
    }
  }, [isOpen])


  const baseWidth = "12rem"
  const width = `max(${targetClient.width}px, ${baseWidth})`
  const yoffset = 8
  const xoffset = 4
  let top = targetClient.bottom + yoffset
  let left = targetClient.left
  // y & x are custom values for dynamic variants set framer-motion
  // TODO: use x for horizontal motion
  // let x
  let y

  if (position.v === "top") {
    top = targetClient.top - menuClient.height - yoffset
    y = -1

    if (targetClient.top - menuClient.height - yoffset < 0) {
      top = targetClient.bottom + yoffset
      y = 1
    }
  } else if (position.v === "bottom") {
    y = 1

    if (windowHeight - targetClient.bottom < menuClient.height + yoffset) {
      top = targetClient.top - menuClient.height - yoffset
      y = -1
    }
  } /* else if (position.v === "align-top") {
    top = targetClient.top
    y = -1

    if (windowHeight - targetClient.bottom < menuClient.height + yoffset) {
      top = targetClient.top - menuClient.height
      y = 1
    }
  } */

  if (position.h === "right") {
    left = targetClient.left + targetClient.width - xoffset
  } else if (position.h === "left") {
    left = -targetClient.left + xoffset
  }

  // the parent <Dropdown.Container /> is a "positioned" element & the nested dropdown menu should be positioned based on it,
  // so the nested's top property should be 0 => aligned horizontally to its parent menu.
  if (isNested) {
    top = 0
  }

  return (
    <Presence trigger={isOpen}>
      <motion.div
        className={cn("p-1 absolute z-50 flex-col gap-[0.325rem]", className)}
        style={{ width, top, left }}
        ref={ref}
        custom={y}
        {...dropdownMenuMotion}
        {...rest}
      >
        {children}
      </motion.div>
    </Presence>
  )
  // i think portal is better aproach but donno how to handle click outside, an opaque backdrop may be?
  // return createPortal(
  //   <Presence trigger={isOpen}>
  //     <motion.div
  //       className={cn("p-1 absolute z-50 flex-col gap-[0.325rem]", className)}
  //       style={{ width: targetClient.width, top, left }}
  //       data-menu
  //       ref={ref}
  //       {...dropdownMenuMotion}
  //     >
  //       {children}
  //     </motion.div>
  //   </Presence>,
  //   document.getElementById("portal")
  // )
}


export function MenuItem({ children, className, ...rest }) {
  return (
    <div className={cn("cursor-default", className)} {...rest}>
      {children}
    </div>
  )
}
