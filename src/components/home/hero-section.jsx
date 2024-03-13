import { useEffect, useState } from "react"

import { getPopularMovies } from "@src/utils/apis"
import HeroMovie from "@components/movie/hero-movie"

import "@styles/hero-section.css"


export default function HeroSection() {
  const [popularMovies, setPopularMovies] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currIndex, setCurrIndex] = useState(0)

  useEffect(() => {
    const loadData = async () => {
      const data = await getPopularMovies()
      setPopularMovies(data)
      setIsLoading(false)
    }
    loadData()
  }, [])

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
    // setCurrIndex(currIndex - 1 % 20)
    setCurrIndex(currIndex - 1)
  }

  return (
    isLoading ? <h2>loading...</h2> : 
    <section className="hero-section">
      <HeroMovie 
        movie={popularMovies[currIndex]} 
        nextMovieBtn={nextMovieBtn} 
        prevMovieBtn={prevMovieBtn}
      />
    </section>
  )
}
