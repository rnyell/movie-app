import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowLongRightIcon, ArrowLongLeftIcon, StarIcon } from "@heroicons/outline"

import { getMovieDetails } from "@src/utils/apis"
import {
  formatRuntime, 
  getMovieGenres, 
  getMovieDirector, 
  formatRate
} from "@src/utils/utils"
import { HeroMovieLoadingSkeleton } from "@components/skeletons"
import Casts from "./casts"


export default function HeroMovie({ movie, showNextMovie, showPrevMovie }) {
  const [isLoading, setIsLoading] = useState(true)
  const [movieDetails, setMovieDetails] = useState("")

  useEffect(() => {
    loadData()
  }, [movie.id])

  async function loadData() {
    const data = await getMovieDetails(movie.id)
    setMovieDetails(data)
    setIsLoading(false)
  }

  const {
    title,
    release_date,
    runtime,
    genres,
    vote_average: rate,
    overview: plot,
    tagline,
    poster_path,
    backdrop_path: bg_path,
    credits,
    videos,
    images, // Obj[] => e.file_path
    // budget,
    // revenue
  } = movieDetails

  // console.log(movieDetails)

  const poster_variants = {
    init: {
      opacity: 0.5,
      transition: { duration: 0.2 }
    },
    anime: {
      opacity: 1,
      transition: { duration: 0.2 }
    }
  }

  const title_variants = {
    init: {
      x: -25,
      transition: { duration: 0.2 }
    },
    anime: {
      x: 0,
      transition: { duration: 0.2 }
    }
  }

  return (
    isLoading ? <HeroMovieLoadingSkeleton /> :
    <div className="hero-movie">
      {/* <h2>Popular Movies</h2> */}
      <div className="grid-container">
        <div className="ambient">
          <img src={`https://image.tmdb.org/t/p/original${bg_path}`} />
        </div>
        <motion.div 
          className="bg-poster" 
          style={{backgroundImage: `url("https://image.tmdb.org/t/p/original${bg_path}")`}}
          variants={poster_variants}
          initial="init"
          animate="anime"
        />
        <figure className="port-poster">
          <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} className="poster-xs" />
        </figure>
        
        <div className="main-details">
          <h2 className="title">{title}</h2>
          <span className="release-date">{release_date.slice(0, 4)}</span>
          <p className="genres">{getMovieGenres(genres)}</p>
        </div>

        <div className="rate">
          <div className="helper-div">
            <i className="icon"><StarIcon /></i>
            <p>{formatRate(rate)}</p>
          </div>
        </div>
        <p className="tagline">{tagline}</p>

        <div className="director">
          <p>Directed by</p>
          <p className="director-name">{getMovieDirector(credits.crew)}</p>
        </div>
        <Casts casts={credits.cast} />
        
        <div className="btns">
          <button onClick={() => showPrevMovie(1)}><ArrowLongLeftIcon /></button>
          <button onClick={() => showNextMovie(1)}><ArrowLongRightIcon /></button>
        </div>
      </div>
    </div>
  )
}
