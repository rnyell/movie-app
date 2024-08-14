import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useMotionValueEvent, useAnimate } from "framer-motion"
import Header from "./header"
import SearchBox from "./search-box"


export default function AnimatedHeader() {
  const [scope, animate] = useAnimate()
  const headerRef = useRef(null)
  const searchboxRef = useRef(null)
  const [headerHeight, setHeaderHeight] = useState(0)
  const { scrollY } = useScroll()

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.clientHeight)
    }
  }, [])

  useMotionValueEvent(scrollY, "change", (latestValue) => {
    const previousValue = scrollY.getPrevious()
    const headerEl = headerRef.current
    const searchboxEl = searchboxRef.current
    const transition = { duration: 0.35, ease: "backOut" }
  
    if (latestValue > previousValue && latestValue > 60) {
      animate(headerEl, { y: -headerHeight }, transition)
      animate(searchboxEl, { y: -headerHeight - 8, scaleX: 1.05 }, transition)
      // animate(searchboxEl, { y: -headerHeight - 8, scaleX: 1.05 }, { duration: 0.15, ease: "easeOut" })
    } else if (latestValue < previousValue) {
      animate(headerEl, { y: 0 }, transition)
      animate(searchboxEl, { y: 0, scaleX: 1 }, transition)
    }
  })


  return (
    <motion.div className="animated-header" ref={scope}>
      <motion.div
        ref={headerRef}
        style={{
          width: "100%",
          position: "fixed",
          top: 0,
          zIndex: "105",
        }}
      >
        <Header hasSearchbox={false} />
      </motion.div>
      <motion.div
        ref={searchboxRef}
        style={{
          padding: "18px 0 16px",
          width: "100%",
          position: "fixed",
          top: headerHeight,
          zIndex: "100",
        }}
      >
        <SearchBox dataset="animated" />
      </motion.div>
    </motion.div>
  )
}
