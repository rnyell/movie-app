import { useEffect, useRef, useState } from "react"
import { motion, useAnimate, useScroll, useTransform, useMotionValueEvent } from "framer-motion"

import Header from "@components/header"
import SideNav from "@components/sidenav"
import Footer from "@components/footer"
import SearchBox from "@components/search-box"
import HeroSection from "@components/home/hero-section"
import ScreenSection from "@components/home/screen-section"
import SeriesSection from "@components/home/series-section"

import "@styles/home-page.css"


export default function Home() {
  const [mainRef, animate] = useAnimate(null)
  // const mainRef = useRef(null)
  const heroRef = useRef(null)
  const sectionsRef = useRef(null)
  const [heroTop, setHeroTop] = useState(0)
  const [autoScrollY, setAutoScrollY] = useState(0)

  useEffect(() => {
    // const mainHeight = mainRef.current.scrollHeight
    const mainHeight = window.innerHeight
    const { top: mainTop } = heroRef.current.getBoundingClientRect()
    const { top: sectionsTop } = sectionsRef.current.getBoundingClientRect()
    heroRef.current.style.top = `${mainTop}px`
    // sectionsRef.current.style.marginTop = `${mainTop}px`
    setHeroTop(mainTop)
    setAutoScrollY(sectionsTop - mainTop)

    console.log(mainTop, autoScrollY)
  }, [heroTop, autoScrollY])

  const { scrollYProgress, scrollY } = useScroll({
    container: mainRef,
    target: sectionsRef,
    offset: ["25vh end", "start start"]
  })

  const heroBlur = useTransform(
    scrollYProgress, (val) => {
      if (val <= 0.1) {
        return `blur(0px) grayscale(0)`
      } else if (0.1 < val <= 0.3) {
        return `blur(7px) grayscale(0.15)`
      } else if (0.3 < val <= 0.4) {
        return `blur(15px) grayscale(0.3)`
      } else if (0.4 < val <= 0.5) {
        return `blur(24px) grayscale(0.55)`
      } else if (0.6 < val) {
        return `blur(35px) grayscale(0.8)`
      }
    }
  )

  const heroOpacity = useTransform(
    scrollY, [0, 150, 225, 350], [1, 0.7, 0.6, 0.4]
  )

  const heroScale = useTransform(
    scrollY, [0, 200, 350, 500], [1, 0.98, 0.96, 0.94]
  )

  const heroTranslateY = useTransform(
    scrollY, [0, 200, 350, 500], [0, -20, -50, -75]
  )

  const sectionsOpacity = useTransform(
    scrollY, [0, 150, 250, 350], [0, 0.45, 0.85, 1]
  )

  useMotionValueEvent(scrollY, "change", (latest) => {
    const threshold = 200
    const previous = scrollY.getPrevious()

    if (latest > previous && latest > threshold) {
      // sectionsRef.current.scrollTo({
        //   top: 50, left: 0, behavior: "smooth"
        // })
        sectionsRef.current.scrollIntoView(true, { behavior: "smooth", block: "start"  })
      console.log("up", latest)
      // animate(".sections-container", { y: -autoScrollY })
    } else if (previous > latest && previous < threshold) {
      console.log("down")
      animate(".sections-container", { y: 0 })
    }

    console.log(latest, previous);
  })

  function handleScroll() {
    // let scrolled = mainRef.current.scrollTop
  
  }

  
  return (
    <div className="home-page">
      <SideNav />
      <main ref={mainRef} onScroll={handleScroll}>
        <Header isHomePage={true}>
          <SearchBox isHomePage={true} />
        </Header>
        <motion.div
          className="hero-container"
          ref={heroRef}
          style={{
            filter: heroBlur,
            opacity: heroOpacity,
            scale: heroScale,
            // y: heroTranslateY
          }}
        >
          <HeroSection />
        </motion.div>
        <motion.div
          className="sections-container"
          ref={sectionsRef}
          style={{
            opacity: sectionsOpacity,
          }}
        >
          <ScreenSection />
          <SeriesSection />
        </motion.div>
        {/* <div className="bg-effect" /> */}
      </main>
    </div>
  )
}
 