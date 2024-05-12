import { useEffect, useState } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeftIcon, BookmarkIcon, StarIcon, PlayIcon } from "@heroicons/outline"
import { useWindow, useMediaDetails } from "@utils/hooks"
import { formatRuntime, getMovieGenres, formatRate } from "@utils/utils"
import { pageInVariants, defaultMotionProps } from "@utils/motions"
import { getMovieTrailer } from "@utils/apis"
import { SelectedMovieSkeleton } from "@components/skeletons"


export default function SelectedMovie() {
  const {windowWidth} = useWindow()
  const [imgUrl, setImgUrl] = useState({
    width: "",
    path: "",
    toString() {
      return `${this.width}${this.path}`
    }
  })
  const navigate = useNavigate()
  const location = useLocation()
  const {state: {media, id, prevUrl}} = location
  const {mediaDetails, isLoading} = useMediaDetails(media, id)
  // const [trailerUrl, setTrailerUrl] = useState("")
  
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

  // function showTrailer(data) {
  //   let officialTrailers = data.results.filter(res => 
  //     res.type === "Trailer" && 
  //     res.official === true
  //   )  
  //   let latestTrailer = officialTrailers[0].key
  //   let trailerUrl = `https://www.youtube.com/watch?v=${latestTrailer}`
  //   setTrailerUrl(trailerUrl)
  // }

  function handleBooking() {
    navigate("/booking", {
      state: {
        title, poster_path, backdrop_path
      }
    })
  }

  if (isLoading) {
    return <SelectedMovieSkeleton />
  }

  return (
    <motion.div
      className="selected-movie"
      variants={pageInVariants}
      {...defaultMotionProps}
    >
      <Link to={prevUrl} className="back-btn">
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
            className="poster"
            src={`https://image.tmdb.org/t/p/${imgUrl}`}
            alt="movie-poster"
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
              <li key={c.name}>
                <img
                  className="cast-img"
                  src={`https://image.tmdb.org/t/p/w154/${c.profile_path}`}
                  alt="cast-image"
                />
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
