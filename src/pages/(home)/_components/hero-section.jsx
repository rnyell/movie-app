import { useEffect, useState, useCallback } from "react"
import { useAppContext } from "@src/store"
import { useWindowOffsets } from "@lib/hooks"
import HeroMovie from "./hero-movie"
import Carousel from "./carousel"
// import Swiper from "./swiper"
import Slider from "./slider"


export default function HeroSection() {
  const { windowWidth } = useWindowOffsets()
  const { moviesState } = useAppContext()
  const [currIndex, setCurrIndex] = useState(0)
  const popularMoviesCount = moviesState.popular.length

  useEffect(() => {
    let interval

    if (windowWidth > 460) {
      // interval = setInterval(() => {
      //   setCurrIndex((currIndex + 1) % popularMoviesCount)
      // }, 5000)
    }

    return () => clearInterval(interval)
  }, [currIndex])

  const showNextMovie = useCallback((num) => {
    setCurrIndex((currIndex + num) % popularMoviesCount)
  })

  const showPrevMovie = useCallback((num) => {
    if (currIndex - num === -1) {
      setCurrIndex(popularMoviesCount - 1)
      return
    }
    setCurrIndex(currIndex - num)
  })

  const bgImages = moviesState.popular.map(obj => obj.backdrop_path)
  const posterImages = moviesState.popular.map(obj => obj.poster_path)

  return (
    <section className="hero-section">
      {windowWidth > 460 ? (
        <>
          <HeroMovie
            result={moviesState.popular[currIndex]}
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
      ) : (
        <Slider
          result={moviesState.popular[currIndex]}
          posters={posterImages}
          currIndex={currIndex}
          showNextMovie={showNextMovie}
          showPrevMovie={showPrevMovie}
        />
      )}
    </section>
  )
}
