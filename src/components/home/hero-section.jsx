import { useEffect, useState } from "react"

import HeroMovie from "@components/movie/hero-movie"
import { useAppState } from "../../store/app-context"
import Carousel from "../movie/carousel"


export default function HeroSection() {
  const [appState] = useAppState()
  const [currIndex, setCurrIndex] = useState(0)
  const popularMoviesNumber = appState.popular.length

  useEffect(() => {
    // const interval = setInterval(() => {
    //   // popularMovies.length = 20
    //   setCurrIndex((currIndex + 1) % 20)
    // }, 5000)
    // return () => clearInterval(interval)
  }, [currIndex])

  function showNextMovie(num) {
    setCurrIndex((currIndex + num) % popularMoviesNumber)
  }

  function showPrevMovie(num) {
    if ((currIndex - num) === -1) {
      setCurrIndex(popularMoviesNumber - 1)
      return
    }
    setCurrIndex(currIndex - num)
  }

  const images = appState.popular.map(obj => obj.poster_path)

  return (
    <section className="hero-section">
      <HeroMovie 
        movie={appState.popular[currIndex]} 
        showNextMovie={showNextMovie}
        showPrevMovie={showPrevMovie}
      />
      <Carousel 
        images={images}
        currIndex={currIndex}
        showNextMovie={showNextMovie}
        showPrevMovie={showPrevMovie}
      />
    </section>
  )
}
