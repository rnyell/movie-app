import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowUpRightIcon, ChevronRightIcon } from "@heroicons/outline"

import { useMovieState } from "@src/store/app-context"
import MovieCard from "@components/movie/movie-card"


export default function SeriesSection() {
  const [movieState] = useMovieState()
  // const draggableRef = useRef(null)

  useEffect(() => {
    
  }, [])
  

  return (
    <div className="series-section">
      <header>
        <h4 className="heading">Trending Series</h4>
        <Link to="/discover/series">Explore more <ChevronRightIcon /></Link>
        {/* <p>Be a couch potato for a week!</p> */}
      </header>
      <div className="draggable-wrapper">
        <div className="draggable scroll-snap-start">
          {movieState.series.slice(0, 12).map(movie =>
            <MovieCard key={movie.id} result={movie} media="tv" variant="series" />
          )}
        </div>
      </div>
    </div>
  )
}