import { useEffect, useState } from "react"

export function useWindow() {
  const [windowSize, setWindowSize] = useState({
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    scrollbarWidth: window.innerWidth - document.documentElement.clientWidth
  })

  useEffect(() => {
    handleResizeEvent()
    window.addEventListener("resize", handleResizeEvent)
    return () => {
      window.removeEventListener("resize", handleResizeEvent)
    }
  }, [])

  function handleResizeEvent() {
    setWindowSize({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      scrollbarWidth: window.innerWidth - document.documentElement.clientWidth
    })

    document.documentElement.style.setProperty(
      "--scrollbar-width",
      `${windowSize.scrollbarWidth}px`
    )
  }

  return {...windowSize}
}

// export function useClickOutside() {

//   useEffect(() => {

//   })
// }