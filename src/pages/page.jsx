import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion"
import { useWindowOffsets } from "@lib/hooks"
import ViewTransition from "@lib/motion/view-transition"
// import Page from "@components/layouts/page"
import HeroSection from "./home/_components/hero-section"
import MoviesSection from "./home/_components/movies-section"
import SeriesSection from "./home/_components/series-section"


export default function HomePage() {
  const {windowWidth} = useWindowOffsets()
  const scrollContainer = useRef(null)
  const heroWrapper = useRef(null)
  
  useEffect(() => {
    scrollContainer.current = document.querySelector(".main-layout main")
  }, [windowWidth])

  const { scrollY } = useScroll({
    container: scrollContainer,
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
    [1, 0.98, 0.97, 0.95]
  )

  // useMotionValueEvent(scrollY, "change", (latest) => {
  //   console.log(latest)
  // })


  return (
    <ViewTransition>
      <div className="home-page">
        {windowWidth > 460 ? (
          <>
            <motion.div
              className="hero-wrapper"
              ref={heroWrapper}
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
              viewport={{amount: 0.15}}
              transition={{duration: 0.25}}
            >
              <MoviesSection />
            </motion.div>
            <motion.div
              initial={{opacity: 0, scale: 0.97}}
              whileInView={{opacity: 1, scale: 1}}
              viewport={{amount: 0.15}}
              transition={{duration: 0.25}}
            >
              <SeriesSection />
            </motion.div>
            <div className="bg-effect" />
          </>
        ) : (
          <>
            <HeroSection />
            <MoviesSection />
            <SeriesSection />
          </>
        )}
      </div>
    </ViewTransition>
  )
}
