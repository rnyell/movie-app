import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useWindowOffsets, useMediaDetails } from "@utils/hooks"
import { formatRuntime, getMovieGenres, getMovieDirector } from "@utils/utils"
import { pageTransitionVariants, defaultVariantsLabel } from "@utils/motions"
import { getMovieTrailer, getRecommendedMovies } from "@utils/apis"
import { IMAGES_URL } from "@utils/apis"
import { SelectedMovieSkeleton } from "@components/skeletons"
import MovieCard from "@components/movie/movie-card"
import Overview from "@components/movie/details/overview"
import Rates from "@components/movie/details/rates"
import Casts from "@components/movie/details/casts"
import WatchButton from "@components/buttons/watch-btn"
import BackButton from "@components/buttons/back-btn"
import FaveButton from "@components/buttons/fave-btn"
import BookmarkButton from "@components/buttons/bookmark-btn"

const imgUrlInit = {
  width: "w500",
  path: "/",
  toString() {
    return `${this.width}${this.path}`
  }
}


export default function SelectedMovie() {
  const {windowWidth} = useWindowOffsets()
  // const [recMovies, setRecMovies] = useState([])
  // const [isRecLoading, setIsRecLoading] = useState(true)
  const location = useLocation()
  const prevUrl = location?.state?.prevUrl
  const id = location.pathname.match(/[^\/]+$/)
  const media = "movie"
  const {mediaDetails, isLoading} = useMediaDetails(media, id)
  const [imgUrl, setImgUrl] = useState(imgUrlInit)

  const {
    title,
    // status,
    release_date,
    runtime,
    poster_path,
    backdrop_path,
    overview,
    // tagline,
    genres,
    external_ids,
    credits,                 // { cast: [], crew: [] }
    videos,                  // { results: [ id, key ] }
    images,                  // { backdrops: [ file_path ], posters: [], logos: [] }
    belongs_to_collection,   // {id, name, poster_path, backdrop_path},
    recommendations,         // { results: [] }
    budget,
    revenue,
    production_companies,    // [ {id, name, logo_path} ]
    production_countries,
    spoken_languages,
  } = mediaDetails

  // credits is undefined. why??
  // const { cast } = credits
  // console.log(cast)

  // useEffect(() => {
  //   loadRecMovies()
  // }, [])
  
  useEffect(() => {
    handleResize()
  }, [mediaDetails, windowWidth])


  // async function loadRecMovies() {
  //   const data = await getRecommendedMovies(id)
  //   setRecMovies(data)
  //   setIsRecLoading(false)
  // }

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


  if (isLoading) {
    return <SelectedMovieSkeleton />
  }

  return (
    <motion.div
      className="selected-media selected-movie"
      variants={pageTransitionVariants}
      {...defaultVariantsLabel}
    >
      <div className="btns flex w-100">
        {prevUrl && <BackButton url={prevUrl} /> }
        <FaveButton />
        <BookmarkButton item={{id, media}} />
      </div>
      <div className="poster-wrapper isolated-stack ::after-abs">
        <div className="bg-poster" style={{backgroundImage: `url(${IMAGES_URL}${imgUrl})`}} />
        <div className="main-details flex-col w-100">
          <h1 className="title">{title}</h1>
          <div className="details">
            <span className="release-date">{release_date?.slice(0, 4)}</span>
            <i className="dot">&#x2022;</i>
            <span className="runtime">{formatRuntime(runtime)}</span>
            <i className="dot">&#x2022;</i>
            <span className="genres">{getMovieGenres(genres)}</span>
          </div>
          <Overview text={overview} />
          <div className="cta-btns flex">
            <WatchButton data={{id, media, prevUrl}} />
            <button className="btn trailer-btn">Trailer</button>
          </div>
        </div>
      </div>

      <div className="additional-details">
        <div className="side-content ::before-abs">
          <h3>Similar Movies</h3>
          <div className="related-movies-container flex">
            {recommendations.results.slice(0, 9).map(movie =>
              <MovieCard key={movie.id} result={movie} media={media} variant="similar" />
            )}
          </div>
        </div>
        {/* <Rates id={external_ids.imdb_id} variant="verbose" /> */}
        <div className="information">
          {/* <figure className="img-poster">
            <img src={`${IMAGES_URL}w500${poster_path})`} />
          </figure> */}
          <div className="credits">
            <Casts casts={credits.cast} mode="list" />
            <div className="director flex">
              <h5 className="tag">Directed By:</h5>
              <p className="director-name">{getMovieDirector(credits.crew)}</p>
            </div>
            {/* <Director crew={credits.crew} tag={true} /> */}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
