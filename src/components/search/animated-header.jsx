import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useMotionValueEvent, useAnimate } from "framer-motion"
import Header from "@components/header"
import SearchBox from "@components/search-box"


export default function AnimatedHeaedr() {
  const [ref, animate] = useAnimate()
  const headerRef = useRef(null)
  const searchboxRef = useRef(null)
  const [headerHeight, setHeaderHeight] = useState(0)
  const { scrollY } = useScroll()

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.clientHeight)
    }
  }, [])

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious()
  
    if (latest > previous && latest > 65) {
      animate(headerRef.current, { y: -headerHeight }, { duration: 0.35, ease: "backOut" })
      animate(searchboxRef.current, { y: -headerHeight, scaleX: 1.04 }, { duration: 0.35, ease: "backOut" })
    } else if (latest < previous) {
      animate(headerRef.current, { y: 0 }, { duration: 0.35, ease: "backOut"  })
      animate(searchboxRef.current, { y: 0, scaleX: 1 }, { duration: 0.35, ease: "backOut"  })
    }
  })


  return (
    <motion.div
      className="animated-header"
      ref={ref}
    >
      <motion.div
        ref={headerRef}
        style={{
          width: "100%",
          position: "fixed",
          top: 0,
          zIndex: "100",
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
