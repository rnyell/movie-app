import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useMotionValueEvent, useAnimate } from "framer-motion"
import Header from "./header"
import SearchBox from "./search-box"

export default function ElasticHeader() {
  const [scope, animate] = useAnimate()
  const headerRef = useRef(null)
  const searchboxRef = useRef(null)
  const [headerHeight, setHeaderHeight] = useState(0)

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.clientHeight)
    }
  }, [])

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latestValue) => {
    const previousValue = scrollY.getPrevious()
    const header = headerRef.current
    const searchbox = searchboxRef.current
    const transition = { duration: 0.35, ease: "backOut" }

    if (latestValue > previousValue && latestValue > 60) {
      animate(header, { y: -headerHeight }, transition)
      animate(searchbox, { y: -headerHeight - 8, scaleX: 1.05 }, transition)
      // animate(searchbox, { y: -headerHeight - 8, scaleX: 1.05 }, { duration: 0.15, ease: "easeOut" })
    } else if (latestValue < previousValue) {
      animate(header, { y: 0 }, transition)
      animate(searchbox, { y: 0, scaleX: 1 }, transition)
    }
  })

  return (
    <motion.div ref={scope}>
      <motion.div className="w-full fixed top-0 z-100" ref={headerRef}>
        <Header withSearchbox={false} />
      </motion.div>
      <motion.div
        className="pt-[18px] pb-[1px] w-full fixed z-100"
        ref={searchboxRef}
        style={{ top: headerHeight }}
      >
        <SearchBox variant="animated" />
      </motion.div>
    </motion.div>
  )
}
