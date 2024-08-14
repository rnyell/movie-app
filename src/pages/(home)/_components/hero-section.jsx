import { useEffect, useState, useCallback } from "react"
import { useAppContext } from "@src/store"
import { useWindowOffsets } from "@lib/hooks"
import HeroMovie from "./hero-movie"
import Carousel from "./carousel"
import Swiper from "./swiper"

import classes from "./hero.module.css"

export default function HeroSection() {
  const { moviesState } = useAppContext()
  const { popular: popularMovies } = moviesState
  const { windowWidth } = useWindowOffsets()
  const isMobile = windowWidth <= 480
  const [currIndex, setCurrIndex] = useState(0)

  useEffect(() => {
    let interval
    let delay = 5000

    // interval = setInterval(() => {
    //   setCurrIndex((currIndex + 1) % popularMovies.length)
    // }, delay)

    return () => clearInterval(interval)
  }, [currIndex])

  const showNextMovie = useCallback((num) => {
    setCurrIndex((currIndex + num) % popularMovies.length)
  })

  const showPrevMovie = useCallback((num) => {
    if (currIndex - num === -1) {
      setCurrIndex(popularMovies.length - 1)
      return
    }
    setCurrIndex(currIndex - num)
  })

  const bgImages = popularMovies.map(obj => obj.backdrop_path)
  const posterImages = popularMovies.map(obj => obj.poster_path)

  return (
    <section className={classes.heroSection}>
      {isMobile ? (
        <Swiper
          result={popularMovies[currIndex]}
          posters={posterImages}
          currIndex={currIndex}
          showNextMovie={showNextMovie}
          showPrevMovie={showPrevMovie}
        />
      ) : (
        <>
          <HeroMovie
            result={popularMovies[currIndex]}
            currIndex={currIndex}
            showNextMovie={showNextMovie}
            showPrevMovie={showPrevMovie}
          />
          <Carousel
            images={bgImages}
            currIndex={currIndex}
            setCurrIndex={setCurrIndex}
            showNextMovie={showNextMovie}
            showPrevMovie={showPrevMovie}
          />
        </>
      )}
    </section>
  )
}
