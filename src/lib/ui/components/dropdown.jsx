import {
  useState,
  useRef,
  createContext,
  useContext,
  useLayoutEffect,
} from "react"
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

  const contextValue = { isOpen, setOpen, targetClient, setTargetClient }

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
  placement = "left-start/bottom",
  ...rest
}) {
  const { windowWidth, windowHeight } = useWindowOffsets()
  const { isOpen, targetClient } = useDropdownContext()
  const [menuClient, setMenuClient] = useState(menuClientInitial)
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (isOpen) {
      const { width, height } = ref.current?.getBoundingClientRect()
      setMenuClient({ ...menuClient, width, height })
    }
  }, [isOpen])

  const offsetY = 8
  const offsetX = 8
  const baseWidth = "12rem"
  const width = `max(${targetClient.width}px, ${baseWidth})`
  let top, left;
  // y & x are custom values for dynamic variants, set framer-motion
  // TODO: use x for horizontal motion
  let x, y;
  // top -> y = -1
  // bottom -> y = 1

  if (placement === "top") {
    left = targetClient.left + (targetClient.width / 2) - (menuClient.width / 2)
    top = targetClient.top - menuClient.height - offsetY
    y = -1
  } else if (placement === "top/start") {
    left = targetClient.left
    top = targetClient.top - menuClient.height - offsetY
    y = -1
  } /* else if (placement === "top/end") {
    // left
    // top
    y = -1
  } */ else if (placement === "bottom") {
    left = targetClient.left + (targetClient.width / 2) - (menuClient.width / 2)
    top = targetClient.bottom + offsetY
    y = 1
  } /* else if (placement === "bottom/start") {
    y = 1
  } */ else if (placement === "bottom/end") {
    left = targetClient.right - menuClient.width
    top = targetClient.bottom + offsetY
    y = 1
  } /* else if (placement === "left") {
    left = targetClient.left - menuClient.width
    // top 
    y = 1
  } */ else if (placement === "left/start") {
    left = targetClient.left - menuClient.width - offsetX
    top = targetClient.top - 2
    y = 1
  } /* else if (placement === "left/end") {
    y = 1
  } else if (placement === "right") {
    y = 1
  } */ else if (placement === "right/start") {
    left = targetClient.right + offsetX + 2
    top = targetClient.top - 2
    //! `2` is a hacky fix
    // when menu is nested, there might be a padding of the <Target />'s parent. we should fix it somehow
    y = 1
  } /* else if (placement === "right/end") {
    y = 1
  } */

  if (placement.includes("top") && targetClient.top - menuClient.height - offsetY < 0) {
    top = targetClient.bottom + offsetY
    y = 1
  } else if (placement.includes("bottom") && windowHeight - targetClient.bottom < menuClient.height + offsetY) {
    top = targetClient.top - menuClient.height - offsetY
    y = -1
  } else if (placement.includes("right") && windowHeight - targetClient.top < menuClient.height) {
    top = targetClient.top - menuClient.height
    y = -1
  } else if (placement.includes("right/") && windowWidth - targetClient.right < menuClient.width) {
    left = targetClient.left + offsetX + 2
  }

  return (
    <Presence trigger={isOpen}>
      <motion.div
        className={cn("p-1 fixed z-50 flex-col gap-[0.325rem]", className)}
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
  // update: enhanced floating via rplacing `absolute` positioning with `fixed`, removed from the document flow and posed based on viewport'
  // so it's kinda a "portall" to the viewport
  /* return createPortal(
       <Presence trigger={isOpen}>
         <motion.div
           className={cn("p-1 absolute z-50 flex-col gap-[0.325rem]", className)}
           style={{ width: targetClient.width, top, left }}
           data-menu
           ref={ref}
           {...dropdownMenuMotion}
         >
           {children}
         </motion.div>
       </Presence>,
       document.getElementById("portal")
   )*/
}

export function MenuItem({ children, className, ...rest }) {
  return (
    <div className={cn("cursor-default", className)} {...rest}>
      {children}
    </div>
  )
}
