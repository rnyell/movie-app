import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowUpRightIcon, ChevronRightIcon } from "@heroicons/outline"

import { useAppState } from "@src/store/app-context"
import MovieCard from "@components/movie/movie-card"


export default function SeriesSection() {
  const [appState] = useAppState()
  const [constrainsWidth, setConstrainsWidth] = useState(400)
  const draggableRef = useRef(null)

  useEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  function handleResize() {
    let offset = 85
    setConstrainsWidth(
      draggableRef.current.scrollWidth - window.innerWidth + offset
    )
  }
  

  return (
    <div className="series-section">
      <header>
        <div>
          <h4 className="heading">Trending Series</h4>
          <Link to="/">Explore more<ChevronRightIcon /></Link>
        </div>
        {/* <p>Be a couch potato for a week!</p> */}
      </header>
      <div className="trending-series-wrapper">
        <motion.div
          ref={draggableRef}
          drag="x"
          dragConstraints={{ left: -constrainsWidth, right: 0 }}
          className="draggable"
        >
          {appState.series.map(movie => <MovieCard key={movie.id} result={movie} type="series" />)}
        </motion.div>
      </div>
    </div>
  )
}