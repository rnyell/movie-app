import { useEffect, useState } from "react"

import { useMovieState } from "@src/store/app-context"
import { useWindow } from "@utils/hooks"
import HeroMovie from "@components/home/hero-movie"
import Carousel from "@components/home/carousel"
import Swiper from "@components/home/swiper"


export default function HeroSection() {
  const {windowWidth} = useWindow()
  const [moviesState] = useMovieState()
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
            movie={moviesState.popular[currIndex]}
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
