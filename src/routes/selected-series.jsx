import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useWindow, useMediaDetails } from "@utils/hooks"
import { formatRuntime, getMovieGenres, getMovieDirector } from "@utils/utils"
import { pageTransitionVariants, defaultVariantsLabel } from "@utils/motions"
import { getMovieTrailer, getRecommendedMovies } from "@utils/apis"
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


export default function SelectedSeries() {
  const {windowWidth} = useWindow()
  const location = useLocation()
  const prevUrl = location?.state?.prevUrl
  const id = location.pathname.match(/[^\/]+$/)
  const media = "series"
  const {mediaDetails, isLoading} = useMediaDetails("tv", id)
  const [imgUrl, setImgUrl] = useState(imgUrlInit)

  const {
    name,
    in_production,         // bool
    status,                // "Ended"
    episode_run_time,
    poster_path,
    backdrop_path,
    genres,
    vote_average,
    last_air_date,
    first_air_date,
    overview,
    number_of_episodes,
    number_of_seasons,
    seasons,               // [{ id, name, poster_path, air_date, vote_average }]
    credits,               // { cast: [], crew: [] }
    production_companies,  // [ {id, name, logo_path} ]
    recommendations,       // { results: [] }
    videos,                // { results: [ id, key ] }
    images,                // { backdrops: [], posters: [], logos: [] }
  } = mediaDetails

  // console.log(mediaDetails)

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



  if (isLoading) {
    return <SelectedMovieSkeleton />
  }

  return (
    <motion.div
      className="selected-media selected-series"
      variants={pageTransitionVariants}
      {...defaultVariantsLabel}
    >
      <div className="btns flex w-100">
        {prevUrl && <BackButton url={prevUrl} /> }
        <FaveButton />
        <BookmarkButton item={{id, media}} />
      </div>

      <div className="poster-wrapper isolated-stack ::after-abs">
        <div className="bg-poster" style={{backgroundImage: `url(https://image.tmdb.org/t/p/${imgUrl})`}} />
        <div className="main-details flex-col w-100">
          <h1 className="title">{name}</h1>
          <div className="details">
            {/* <span className="release-date">{release_date?.slice(0, 4)}</span> */}
            <i className="dot">&#x2022;</i>
            {/* <span className="runtime">{formatRuntime(runtime)}</span> */}
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
        
      </div>
    </motion.div>
  )
}