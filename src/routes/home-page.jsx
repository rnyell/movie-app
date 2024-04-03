import { useEffect, useRef, useState } from "react"
import { motion, useAnimate, useScroll, useTransform, useMotionValueEvent } from "framer-motion"

import { useWindow } from "@src/utils/hooks"
import Header from "@components/header"
import SideNav from "@components/sidenav"
import SearchBox from "@components/search-box"
import HeroSection from "@components/home/hero-section"
import ScreenSection from "@components/home/screen-section"
import SeriesSection from "@components/home/series-section"
import Footer from "@components/footer"
// import Scroller from "@components/animated/scroller"


export default function HomePage() {
  const { windowWidth, windowHeight } = useWindow()
  const [fixedHeight, setFixedHeight] = useState()
  const [mainRef, animate] = useAnimate(null)
  // const mainRef = useRef(null)
  const fixedRef = useRef(null)
  const heroRef = useRef(null)
  const sectionsRef = useRef(null)
  const divRef = useRef(null)

  useEffect(() => {
    setFixedHeight(fixedRef.current.scrollHeight)
    console.log(fixedHeight)
  }, [windowWidth, windowHeight, fixedHeight])

  const { scrollYProgress, scrollY } = useScroll({
    container: mainRef,
    target: sectionsRef,
    offset: ["0% end", "start start"]
  })

  // const heroBlur = useTransform(
  //   scrollY, (val) => {
  //     if (val <= 100) {
  //       return `blur(0px) grayscale(0)`
  //     } else if (100 < val <= 220) {
  //       return `blur(7px) grayscale(0.2)`
  //     } else if (220 < val <= 300) {
  //       return `blur(15px) grayscale(0.4)`
  //     } else if (300 < val <= 400) {
  //       return `blur(24px) grayscale(0.6)`
  //     } else if (400 < val) {
  //       return `blur(35px) grayscale(0.85)`
  //     }
  //   }
  // )

  const heroBlur = useTransform(
    scrollY, val => `blur(${12}) grayscale(${1})`
  )

  const heroOpacity = useTransform(
    scrollY, [0, 150, 225, 350], [1, 0.7, 0.6, 0.4]
  )

  const heroScale = useTransform(
    scrollY, [0, 200, 350, 500], [1, 0.98, 0.96, 0.94]
  )

  const heroTranslateY = useTransform(
    scrollY, [0, 200, 350, 500], [0, 20, 50, 75]
  )

  const x = useTransform(
    scrollY, [0, 200, 350, 500], [0, 20, 50, 75]
  )

  const sectionsOpacity = useTransform(
    scrollY, [0, 150, 250, 350], [0, 0.45, 0.85, 1]
  )

  const sectionsTranslateY = useTransform(
    scrollY, [0, 200, 350, 500], [0, -400, -500, -600]
  )

  useMotionValueEvent(scrollY, "change", (latest) => {
    const threshold = 200
    const previous = scrollY.getPrevious()
    // console.log(latest)

    if (latest > previous && latest > threshold) {
      // sectionsRef.current.scrollTo({
      //   top: 50, left: 0, behavior: "smooth"
      // })
      // animate(".sections-container", { y: -500 })
    } else if (previous > latest && previous < threshold) {
      // animate(".sections-container", { y: 0 })
    }
  })

  
  return (
    <div className="home-page">
      <SideNav />
      <main ref={mainRef} className="home-content">
        <div ref={fixedRef} data-fixed-scroll>
          <Header isHomePage={true}>
            <SearchBox isHomePage={true} />
          </Header>
          <motion.div
            ref={heroRef}
            style={{
              // filter: heroBlur,
              // opacity: heroOpacity,
              // scale: heroScale,
              // y: heroTranslateY
            }}
          >
            <HeroSection />
          </motion.div>
          <motion.div
            className="sections-container"
            ref={sectionsRef}
            style={{
              // y: sectionsTranslateY,
              // opacity: sectionsOpacity,
            }}
          >
            <ScreenSection />
            <SeriesSection />
          </motion.div>
        </div>
        <motion.div ref={divRef} data-fake-scroll style={{ height: 2/3 * fixedHeight }} />
        <div className="bg-effect" />
      </main>
    </div>
  )
}
 