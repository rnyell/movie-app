import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { motion, useScroll, useTransform } from "framer-motion"

import { useWindow } from "@utils/hooks"
import Header from "@components/header"
import SideNav from "@components/sidenav"
import HeroSection from "@components/home/hero-section"
import ScreenSection from "@components/home/screen-section"
import SeriesSection from "@components/home/series-section"


export default function HomePage() {
  const {windowWidth, windowHeight} = useWindow()
  const [mainRefHeight, setMainRefHeight] = useState(300)
  const mainRef = useRef(null)

  useEffect(() => {
    if (mainRef.current) {
      setMainRefHeight(mainRef.current.scrollHeight)
    }
  }, [windowWidth, windowHeight, mainRefHeight])

  const { scrollY } = useScroll({
    container: mainRef,
    offset: ["start end", "start start"],
  })

  const heroOpacity = useTransform(
    scrollY,
    [0, 150, 225, 350],
    [1, 0.7, 0.55, 0.35]
  )

  const heroScale = useTransform(
    scrollY,
    [0, 200, 350, 500],
    [1, 0.98, 0.97, 0.96]
  )

  return (
    <div className="home-page">
      <SideNav />
      <main ref={mainRef} className="home-content">
        {windowWidth > 460 ? (
          <>
            <Header dataset="default lg-screen" />
            <motion.div
              style={{
                opacity: heroOpacity,
                scale: heroScale,
              }}
            >
              <HeroSection />
            </motion.div>
            <motion.div
              initial={{opacity: 0, scale: 0.97, y: 10}}
              whileInView={{opacity: 1, scale: 1, y: 0}}
              viewport={{amount: 0.1}}
              transition={{duration: 0.2}}
            >
              <ScreenSection />
            </motion.div>
            <motion.div
              initial={{opacity: 0, scale: 0.97}}
              whileInView={{opacity: 1, scale: 1}}
              viewport={{amount: 0.1}}
              transition={{duration: 0.2}}
            >
              <SeriesSection />
            </motion.div>
            <div style={{height: "100px"}} />
            <div className="bg-effect" />
          </>
        ) : (
          <>
            <Header dataset="default sm-screen" />
            <HeroSection />
            <ScreenSection />
            <SeriesSection />
          </>
        )}
      </main>
    </div>
  )
}
