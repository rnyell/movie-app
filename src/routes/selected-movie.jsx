import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { PlayIcon } from "@heroicons/outline"
import { useWindow, useMediaDetails } from "@utils/hooks"
import { readLocalStorage, formatRuntime, getMovieGenres, getMovieDirector } from "@utils/utils"
import { pageTransitionVariants, defaultVariantsLabel } from "@utils/motions"
import { getMovieTrailer, getRecommendedMovies } from "@utils/apis"
import { SelectedMovieSkeleton } from "@components/skeletons"
import MovieCard from "@components/movie/movie-card"
import Casts from "@components/movie/casts"
import Rates from "@components/movie/rates"
import BackButton from "@components/buttons/back-btn"
import BookmarkButton from "@components/buttons/bookmark-btn"
import FaveButton from "@components/buttons/fave-btn"

const imgUrlInit = {
  width: "w500",
  path: "/",
  toString() {
    return `${this.width}${this.path}`
  }
}


export default function SelectedMovie() {
  const {windowWidth} = useWindow()
  const [recMovies, setRecMovies] = useState([])
  const [isRecLoading, setIsRecLoading] = useState(true)
  // const location = useLocation()
  // const {state: {id, media, prevUrl}} = location
  const navigate = useNavigate()
  const {id, media, prevUrl} = readLocalStorage("linkData")
  const {mediaDetails, isLoading} = useMediaDetails(media, id)
  const [imgUrl, setImgUrl] = useState(imgUrlInit)

  const {
    title,
    release_date,
    runtime,
    poster_path,
    backdrop_path,
    overview,
    genres,
    credits,
    external_ids,
    videos,
    images,
    belongs_to_collection,
    budget,
    revenue,
  } = mediaDetails


  useEffect(() => {
    loadRecMovies()
  }, [])
  
  useEffect(() => {
    handleResize()
  }, [mediaDetails, windowWidth])


  async function loadRecMovies() {
    const data = await getRecommendedMovies(id)
    setRecMovies(data)
    setIsRecLoading(false)
  }

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

  function playMovie(id) {
    userDispatch({ type: "played", id })
    navigate("/player", { state: { id, media } })
  }

  // credits is undefined. why??
  // const { cast } = credits
  // console.log(cast)

  {// function showTrailer(data) {
  //   let officialTrailers = data.results.filter(res => 
  //     res.type === "Trailer" && 
  //     res.official === true
  //   )  
  //   let latestTrailer = officialTrailers[0].key
  //   let trailerUrl = `https://www.youtube.com/watch?v=${latestTrailer}`
  //   setTrailerUrl(trailerUrl)
  // }
  }


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
        <BackButton url={prevUrl} />
        <FaveButton />
        <BookmarkButton item={{id, media}} size="lg" color="light" />
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
        {/* <figure className="img-poster">
          <img src={`https://image.tmdb.org/t/p/w500${poster_path})`} />
        </figure> */}
        <div className="side-content ::before-abs">
          <h4>Similar Movies</h4>
          <div className="related-movies-container flex">
            {!isRecLoading && recMovies.slice(0, 10).map(movie => 
              <MovieCard key={movie.id} result={movie} media={media} variant="similar" />
            )}
          </div>
        </div>

        <Rates id={external_ids.imdb_id} variant="verbose" />
        <div className="information">
          <div className="credits">
            <Casts casts={credits.cast} mode="list" />
            <div className="director flex">
              <h5 className="tag">Directed By:</h5>
              <p className="director-name">{getMovieDirector(credits.crew)}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
