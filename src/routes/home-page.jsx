import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useInView, useTransform, useMotionValueEvent } from "framer-motion"

import Header from "@components/header"
import SideNav from "@components/sidenav"
import Footer from "@components/footer"
import SearchBox from "@components/search-box"
import HeroSection from "@components/home/hero-section"
import ScreenSection from "@components/home/screen-section"
import SeriesSection from "@components/home/series-section"

import "@styles/home-page.css"


export default function Home() {
  const [v, setV] = useState(0)
  const mainRef = useRef(null)
  const sectionsRef = useRef(null)
  // const isInView = useInView(sectionsRef)
  const { scrollYProgress, scrollY } = useScroll({
    // target: mainRef,
    target: sectionsRef,
    // offset: ["5% 100%", "100% 100%"],
    // offset: ["start end", "start start"]
  })

  useEffect(() => {
    const unsubscrollY = scrollY.on("change", handleScrollChange)
    
    return () => {
      unsubscrollY()
    }
  }, [scrollYProgress, scrollY])

  // useMotionValueEvent(scrollY, "change", (latest) => {
  //   setV(prev => prev + latest)
  //   console.log(v)
  // })

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setV(latest)
  })

  function handleScrollChange(latest) {
    console.log("x changed to", latest)
  }

  // initial="hidden"
  // whileInView="visible"
  // viewport={{ once: false, amount: 0.1 }}
  // transition={{ duration: 0.7 }}
  // variants={{
  //   hidden: { opacity: 0, y: 0 },
  //   visible: { opacity: 1, y: -500 }
  // }}
  
  return (
    <div className="home-page">
      <SideNav />
      <main ref={mainRef}>
        <Header isHomePage={true}>
          <SearchBox isHomePage={true} />
        </Header>
        <div className="hero-container scroll-target-1">
          <HeroSection />
        </div>
        <motion.div
          className="sections-container scroll-target-2"
          ref={sectionsRef}
          style={{
            // y: -scrollY
          }}
          // style={{ scaleX: scrollYProgress }}
        >
          <ScreenSection />
          <SeriesSection />
        </motion.div>

        {/* TODO move it to rootlayout */}
        {/* <div className="background-effect"></div> */}
        <Footer />
      </main>
    </div>
  )
}
