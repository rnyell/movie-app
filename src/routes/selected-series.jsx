import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useWindowOffsets, useMediaDetails } from "@utils/hooks"
import { formatReleaseDate, formatRuntime, getMovieGenres, getMovieDirector } from "@utils/utils"
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
import Pictures from "@components/selected-movie/pictures"

const imgUrlInit = {
  width: "w500",
  path: "/",
  toString() {
    return `${this.width}${this.path}`
  }
}


export default function SelectedSeries() {
  const {windowWidth} = useWindowOffsets()
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
    created_by,            // [ { name, id } ]
    networks,              // [ { name, id, logo_path} ]
    production_companies,  // [ {id, name, logo_path} ]
    recommendations,       // { results: [] }
    videos,                // { results: [ id, key ] }
    images,                // { backdrops: [{ file_path }], posters: [], logos: [] }
  } = mediaDetails

  console.log(mediaDetails)

  const urls = videos?.results.map(res => res)
  let officialTrailers = urls?.filter(res => 
    res.type === "Trailer" && 
    res.official === true
  )
  console.log(officialTrailers)

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
      <div className="btns align-center w-100">
        {/* {prevUrl && <BackButton url={prevUrl} /> } */}
        <div className="network flex-center">
          <img className="network-logo" src={`${IMAGES_URL}w500${networks[0].logo_path}`} alt="logo" />
        </div>
        <FaveButton />
        <BookmarkButton item={{id, media}} />
      </div>

      <section className="poster-wrapper isolated-stack ::after-abs">
        <div className="bg-poster" style={{backgroundImage: `url(${IMAGES_URL}${imgUrl})`}} />
        <div className="main-details flex-col w-100">
          <h1 className="title">{name}</h1>
          <div className="details">
            <span className="release-date">{formatReleaseDate(first_air_date)}</span>
            <i className="dot">&#x2022;</i>
            <span className="seasons-number">
              {number_of_seasons} {`${number_of_seasons > 1 ? "Seasons" : "Season"}`}
            </span>
            <i className="dot">&#x2022;</i>
            <span className="genres">{getMovieGenres(genres)}</span>
          </div>
          <Overview text={overview} />
          <div className="sm-credits">
            <Casts casts={credits.cast} mode="names" />
            <div className="creators flex">
              <h6>Creators:</h6>
              {created_by.map(creator => <p className="creator-name" key={creator.name}>{creator.name}<span>,</span></p>)}
            </div>
          </div>
        </div>
      </section>

      <section className="details-wrapper flex-col">
        <div className="seasons-container">
          <h4 className="heading">Seasons</h4>
          <div className="seasons flex">
            {seasons.map(season => (
              <div className="season flex-item" key={season.name}>
                <img className="season-poster" src={`${IMAGES_URL}w500${season.poster_path}`} />
                {/* <p className="season-name">{season.name}</p> */}
              </div>
            ))}
          </div>
        </div>
        <hr />
        <div className="visuals">
          <div className="trailers">
            <h4 className="heading">Trailers</h4>
            {/* {officialTrailers.map(t => (
              <iframe
                key={t.key}
                src={`https://www.youtube.com/embed/${t.key}?controls=0&modestbranding=1&rel=0&showInfo=0`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
              ></iframe>
            ))} */}
          </div>
          <Pictures images={images} />
        </div>
        <hr />
        <div className="additional-information"></div>
      </section>
    </motion.div>
  )
}