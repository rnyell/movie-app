import { useEffect, useState } from "react"

import { useAppState } from "@src/store/app-context"
import HeroMovie from "@components/movie/hero-movie"
import Carousel from "@components/movie/carousel"


export default function HeroSection() {
  const [appState] = useAppState()
  const [currIndex, setCurrIndex] = useState(0)
  const popularMoviesNumber = appState.popular.length

  useEffect(() => {
    // const interval = setInterval(() => {
    //   setCurrIndex((currIndex + 1) % popularMoviesNumber)
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

  const images = appState.popular.map(obj => obj.backdrop_path)

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
        setCurrIndex={setCurrIndex}
        showNextMovie={showNextMovie}
        showPrevMovie={showPrevMovie}
      />
    </section>
  )
}
