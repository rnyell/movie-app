import { useEffect, useState } from "react"

import { useMovieState } from "@src/store/app-context"
import { useWindow } from "@src/utils/hooks"
import HeroMovie from "@components/home/hero-movie"
import Carousel from "@components/home/carousel"
import Swiper from "@components/home/swiper"


export default function HeroSection() {
  const [movieState] = useMovieState()
  const [currIndex, setCurrIndex] = useState(0)
  const popularMoviesNumber = movieState.popular.length
  const { windowWidth } = useWindow()

  useEffect(() => {
    let interval

    if (windowWidth > 460) {
      // interval = setInterval(() => {
      //   setCurrIndex((currIndex + 1) % popularMoviesNumber)
      // }, 5000)
    }

    // return () => clearInterval(interval)
  }, [currIndex])

  function showNextMovie(num) {
    setCurrIndex((currIndex + num) % popularMoviesNumber)
  }

  function showPrevMovie(num) {
    if (currIndex - num === -1) {
      setCurrIndex(popularMoviesNumber - 1)
      return
    }
    setCurrIndex(currIndex - num)
  }

  const images = movieState.popular.map((obj) => obj.backdrop_path)

  return (
    <section className="hero-section">
      {windowWidth > 460 ? (
        <>
          <HeroMovie
            movie={movieState.popular[currIndex]}
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
          movie={movieState.popular}
          currIndex={currIndex}
          setCurrIndex={setCurrIndex}
        />
      )}
    </section>
  )
}
