import { useEffect, useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { motion } from "framer-motion"
import { ChevronLeftIcon, BookmarkIcon, StarIcon, PlayIcon } from "@heroicons/outline"

import { useSelectedMovie } from '@src/store/app-context'
import { getMovieDetails, getMovieTrailer } from "@src/utils/apis"
import { formatRuntime, getMovieGenres, formatRate } from '@src/utils/utils'
import { SelectedMovieSkeleton } from '@components/skeletons'

import "@styles/selected-movie.css"


export default function SelectedMovie() {
  const [imgUrl, setImgUrl] = useState({
    width: "",
    path: "",
    toString() {
      return `${this.width}${this.path}`
    }
  })
  const [trailerUrl, setTrailerUrl] = useState("")
  const [windowWidth, setWindowWidth] = useState(365)
  const [isLoading, setIsLoading] = useState(true)
  const [, setSelectedMovie] = useSelectedMovie()
  const [movie, setMovie] = useState("")
  const navigate = useNavigate()
  const { state } = useLocation()
  const id = state.id

  useEffect(() => {
    setWindowWidth(window.innerWidth)

    const loadMovie = async () => {
    const res = await getMovieDetails(id)
    setMovie(res)
    setIsLoading(false)
  }
    loadMovie()

    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  useEffect(() => {
    handleResize()
  }, [movie, windowWidth])


  function handleResize() {
    if (windowWidth < 390) {
      setImgUrl({
        ...imgUrl,
        width: "w300",
        path: poster_path
      })
    } else if (windowWidth < 620) {
      setImgUrl({
        ...imgUrl,
        width: "w500",
        path: poster_path
      })
    } else {
      setImgUrl({
        ...imgUrl,
        width: "original",
        path: bg_path
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
    tagline,
    poster_path,
    backdrop_path: bg_path,
    credits,
    videos,
    budget,
    revenue,
    belongs_to_collection
  } = movie

  //! WTF
  // credits is undefined
  // const { cast } = credits
  // console.log(movie)

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
    // just 2024 movies, avalibale in "On Screen" movies
    setSelectedMovie({ title, poster_path })
    navigate("/booking")
  }

  const variants = {
    initial: {
      opacity: 0.5,
      scale: 0.95,
      y: 20,
    },
    anime: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.300
      }
    },
    exit: {
      opacity: 0.85,
      y: 100
    }
  }

  return (
    isLoading ? <SelectedMovieSkeleton /> :
    <motion.section
      variants={variants}
      initial="initial"
      animate="anime"
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
            {
              credits.cast.slice(0, 7).map(c => 
                <li>
                  <img className='cast-img' src={`https://image.tmdb.org/t/p/w154/${c.profile_path}`} alt="cast-profile" />
                  <p className="cast-name">{c.name}</p>
                </li>)
            }
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
    </motion.section>
  )
}
