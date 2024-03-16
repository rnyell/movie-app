import { useEffect, useState } from "react"

import HeroMovie from "@components/movie/hero-movie"
import { useAppState } from "../../store/app-context"


export default function HeroSection() {
  const [appState] = useAppState()
  const [currIndex, setCurrIndex] = useState(0)

  useEffect(() => {
    // const interval = setInterval(() => {
    //   // popularMovies.length = 20
    //   setCurrIndex((currIndex + 1) % 20)
    // }, 5000)
    // return () => clearInterval(interval)
  }, [currIndex])

  function nextMovieBtn() {
    setCurrIndex((currIndex + 1) % 20)
  }

  function prevMovieBtn() {
    if ((currIndex - 1) === -1) {
      setCurrIndex(20 - 1)
      return
    }
    setCurrIndex(currIndex - 1)
  }

  return (
    <section className="hero-section">
      <HeroMovie 
        movie={appState.popular[currIndex]} 
        nextMovieBtn={nextMovieBtn} 
        prevMovieBtn={prevMovieBtn}
      />
    </section>
  )
}
