import { useEffect, useState } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeftIcon, BookmarkIcon, HeartIcon, StarIcon, PlayIcon } from "@heroicons/outline"
import { useWindow, useMediaDetails } from "@utils/hooks"
import { formatRuntime, getMovieGenres, formatRate, getMovieDirector } from "@utils/utils"
import { pageTransitionVariants, defaultVariantsLabel } from "@utils/motions"
import { getMovieTrailer } from "@utils/apis"
import { SelectedMovieSkeleton } from "@components/skeletons"
import Casts from "@components/movie/casts"


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
    vote_average: rate,
    poster_path,
    backdrop_path,
    overview,
    genres,
    credits,
    videos,
    budget,
    revenue,
    belongs_to_collection
  } = mediaDetails

  console.log(mediaDetails)

  // credits is undefined. why??
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


  if (isLoading) {
    return <SelectedMovieSkeleton />
  }

  return (
    <motion.div
      className="selected-movie"
      variants={pageTransitionVariants}
      {...defaultVariantsLabel}
    >
      <div className="btns flex w-100">
        <Link to={prevUrl} className="btn back-btn">
          <i className="icon">
            <ChevronLeftIcon />
          </i>
        </Link>
        <button className="btn fave-btn">
          <i className="icon fave-icon">
            <HeartIcon />
          </i>
        </button>
        <button className="btn bookmark-btn">
          <i className="icon bookmark-icon">
          <BookmarkIcon />
          </i>
        </button>
      </div>
      <div className="poster-wrapper isolated-stack ::after-abs">
        <div className="bg-poster h-100" style={{backgroundImage: `url(https://image.tmdb.org/t/p/${imgUrl})`}} />
        <div className="main-details flex-col w-100">
          <h2 className="title">{title}</h2>
          <div className="details">
            <span className="release-date">{release_date?.slice(0, 4)}</span>
            <i className="dot">&#x2022;</i>
            <span className="runtime">{formatRuntime(runtime)}</span>
            <i className="dot">&#x2022;</i>
            <span className="genres">{getMovieGenres(genres)}</span>
          </div>
          <p className="overview">{overview}</p>
          <div className="cta-btns flex">
            <button className="btn watch-btn">
              <i className="icon"><PlayIcon /></i>
              <span>Watch</span>
            </button>
            <button className="btn trailer-btn">Trailer</button>
          </div>
        </div>
      </div>

      <div className="sub-details">
        <figure className="img-poster">
          <img src={`https://image.tmdb.org/t/p/w500${poster_path})`} />
        </figure>
        <div className="credits">
          <Casts casts={credits.cast} mode="list" />
          <div className="director flex">
            <h5 className="tag">Directed By</h5>
            <p className="director-name">{getMovieDirector(credits.crew)}</p>
          </div>
        </div>

        <div className="related-content">

        </div>
      </div>
    </motion.div>
  )
}
