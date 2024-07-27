import { useEffect, useState } from "react"
import { useMoviesState } from "@src/store"
import { useWindowOffsets } from "@lib/hooks"
import HeroMovie from "./hero-movie"
import Carousel from "./carousel"
import Swiper from "./@smd/swiper"


export default function HeroSection() {
  const {windowWidth} = useWindowOffsets()
  const [moviesState] = useMoviesState()
  const [currIndex, setCurrIndex] = useState(0)
  const popularMoviesCount = moviesState.popular.length

  useEffect(() => {
    let interval

    if (windowWidth > 460) {
      // interval = setInterval(() => {
      //   setCurrIndex((currIndex + 1) % popularMoviesCount)
      // }, 5000)
    }

    // return () => clearInterval(interval)
  }, [currIndex])

  function showNextMovie(num) {
    setCurrIndex((currIndex + num) % popularMoviesCount)
  }

  function showPrevMovie(num) {
    if (currIndex - num === -1) {
      setCurrIndex(popularMoviesCount - 1)
      return
    }
    setCurrIndex(currIndex - num)
  }

  const images = moviesState.popular.map((obj) => obj.backdrop_path)

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
            images={images}
            currIndex={currIndex}
            setCurrIndex={setCurrIndex}
            showNextMovie={showNextMovie}
            showPrevMovie={showPrevMovie}
          />
        </>
      ) : (
        <Swiper
          movie={moviesState.popular}
          currIndex={currIndex}
          setCurrIndex={setCurrIndex}
          showNextMovie={showNextMovie}
          showPrevMovie={showPrevMovie}
        />
      )}
    </section>
  )
}
