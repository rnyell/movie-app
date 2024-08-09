import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useWindowOffsets } from "@lib/hooks"
import { ViewTransition } from "@lib/motion"
import HeroSection from "./_components/hero-section"
import MoviesSection from "./_components/movies-section"
import SeriesSection from "./_components/series-section"
import FeaturedSection from "./_components/featured-section"


export default function HomePage() {
  const scrollContainer = useRef(null)
  const heroWrapper = useRef(null)
  const { windowWidth } = useWindowOffsets()
  const isMobile = windowWidth > 460
  
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
        {isMobile ? (
          <>
            <HeroSection />
            <FeaturedSection />
          </>
        ) : (
          <>
            <HeroSection />
            <FeaturedSection />
            {/* <motion.div
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
            </motion.div> */}
            <div className="bg-effect" />
          </>
        )}
      </div>
    </ViewTransition>
  )
}
