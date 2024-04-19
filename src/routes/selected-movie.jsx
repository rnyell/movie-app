import { useEffect, useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeftIcon, BookmarkIcon, StarIcon, PlayIcon } from "@heroicons/outline"

import { getMovieDetails, getSeriesDetails, getMovieTrailer } from "@src/utils/apis"
import { formatRuntime, getMovieGenres, formatRate } from '@src/utils/utils'
import { SelectedMovieSkeleton } from '@components/skeletons'
import { useWindow } from '@src/utils/hooks'


export default function SelectedMovie() {
  const { windowWidth } = useWindow()
  const [mediaDetails, setMediaDetails] = useState({})
  const [imgUrl, setImgUrl] = useState({
    width: "", path: "",
    toString() {
      return `${this.width}${this.path}`
    }
  })
  const [trailerUrl, setTrailerUrl] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const { state } = useLocation()
  const { type, id } = state

  useEffect(() => {
    loadData()
  }, [])
  
  async function loadData() {
    let data

    if (type === "movie") {
      data = await getMovieDetails(id)
    } else if (type === "tv") {
      data = await getSeriesDetails(id)
    }

    setMediaDetails(data)
    setIsLoading(false)
  }
  
  useEffect(() => {
    handleResize()
  }, [mediaDetails, windowWidth])


  function handleResize() {
    if (windowWidth < 620) {
      setImgUrl({
        ...imgUrl,
        width: "w500",
        path: poster_path
      })
    } else {
      setImgUrl({
        ...imgUrl,
        width: "original",
        path: backdrop_path
      })
    }
  }
  
  const {
    title,
    release_date,
    runtime,
    genres,
    vote_average: rate,
    overview: plot,
    poster_path,
    backdrop_path,
    credits,
    videos,
    budget,
    revenue,
    belongs_to_collection
  } = mediaDetails

  //!
  // credits is undefined
  // const { cast } = credits
  // console.log(mediaDetails)

  function showTrailer(data) {
    let officialTrailers = data.results.filter(res => 
      res.type === "Trailer" && 
      res.official === true
    )
  
    let latestTrailer = officialTrailers[0].key
    let trailerUrl = `https://www.youtube.com/watch?v=${latestTrailer}`
    setTrailerUrl(trailerUrl)
    // console.log(trailerUrl)
  }

  function handleBooking() {
    navigate("/booking", { state: { title, poster_path, backdrop_path }})
  }

  const variants = {
    initial: {
      opacity: 0.65,
      scale: 0.96,
      y: 15,
      x: -10,
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.25
      }
    },
    exit: {
      opacity: 0.85,
      y: 25
    }
  }

  if (isLoading) {
    return <SelectedMovieSkeleton />
  }

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="selected-movie"
    >
    <Link to={state.prevUrl} className="back-btn">
      <i className="icon">
        <ChevronLeftIcon />
      </i>
      </Link>
      <div className="btn">
        <i className="icon bookmark-icon">
         <BookmarkIcon />
        </i>
      </div>
      <div className="poster-wrapper">
        <figure>
          <img
            src={`https://image.tmdb.org/t/p/${imgUrl}`}
            alt="movie-poster"
            className="poster"
          />
        </figure>
        <div className="gradient">
          <div className="details">
            <span className="runtime">{formatRuntime(runtime)}</span>
            <i className="dot">&#x2022;</i>
            <span className="genres">{getMovieGenres(genres)}</span>
            <i className="dot">&#x2022;</i>
            <span className="release-date">{release_date?.slice(0, 4)}</span>
          </div>
        </div>
      </div>
      <div className="description">
        <h3 className="title">{title}</h3>
        <p className="plot">{plot}</p>
        <div className='casts-wrapper'>
          <h4>Casts</h4>
          <ul className="casts">
            {credits.cast.slice(0, 7).map(c => 
              <li>
                <img className='cast-img' src={`https://image.tmdb.org/t/p/w154/${c.profile_path}`} alt="cast-profile" />
                <p className="cast-name">{c.name}</p>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="cta">
        <button onClick={() => showTrailer(videos)} className="trailer-btn">
          <span>Watch Trailer</span>
          <i className="icon play-icon">
            <PlayIcon />
          </i>
        </button>
        <button onClick={handleBooking} className="book-btn">Book Now</button>
      </div>
    </motion.div>
  )
}
