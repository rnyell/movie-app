import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { motion } from "framer-motion"
import { useWindowOffsets, useMediaDetails } from "@utils/hooks"
import { formatReleaseDate, formatRuntime, getMovieGenres, getMovieDirector } from "@utils/utils"
import { pageTransitionVariants, defaultVariantsLabel } from "@utils/motions"
import { IMAGES_URL, getRecommendedMovies } from "@utils/apis"
import { SelectedMovieSkeleton } from "@components/skeletons"
import MovieCard from "@components/movie/movie-card"
import Overview from "@components/movie/details/overview"
// import Rates from "@components/movie/details/rates"
import Casts from "@components/movie/details/casts"
import WatchButton from "@components/buttons/watch-btn"
import BackButton from "@components/buttons/back-btn"
import FaveButton from "@components/buttons/fave-btn"
import NetworkLogo from "@components/selected-movie/network-logo"
import BookmarkButton from "@components/buttons/bookmark-btn"
import Pictures from "@components/selected-movie/pictures"
import Trailers from "@components/selected-movie/trailers"

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
  const {id} = useParams()
  const media = "series"
  const prevUrl = location?.state?.prevUrl
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
    production_countries,
    spoken_languages,
  } = mediaDetails

  // console.log(mediaDetails)

  useEffect(() => {
    handleResize()
  }, [mediaDetails, windowWidth])

  // TODO: handle it with just windowWidth: conditional path...
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
      <section className="poster-wrapper isolated-stack ::after-abs">
        <div className="bg-poster" style={{backgroundImage: `url(${IMAGES_URL}${imgUrl})`}} />
        <div className="main-details flex-col w-100">
          <h1 className="main-title">{name}</h1>
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
              <h6 className="heading">Creators:</h6>
              {created_by.map(creator => <p className="creator-name" key={creator.name}>{creator.name}<span>,</span></p>)}
            </div>
          </div>
        </div>
      </section>
      <section className="details-wrapper grid">
        <div className="seasons-container">
          <h4 className="heading">Seasons {in_production && <p className="in-production-tag">(Season {seasons.length} is in production)</p>}</h4>
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
          <Trailers videos={videos} />
          <Pictures images={images} />
        </div>
        <hr />
        <Casts casts={credits.cast} mode="list" />
        <div className="information-table">
          {/* <h5>More Details</h5> */}
          <div className="col col-1">
            <dl>
              <div className="td">
                <dt>First Air Date:</dt>
                <dd>{first_air_date}</dd>
              </div>
              <div className="td">
                <dt>Episode Runtime:</dt>
                <dd>{episode_run_time}</dd>
              </div>
              <div className="td">
                <dt>Country:</dt>
                <dd>
                  {production_countries.map(pc =>
                    <span key={pc.name}>{pc.name === "United States of America" ? "US" : pc.name}</span>
                  )}
                </dd>
              </div>
              <div className="td">
                <dt>Languages:</dt>
                <dd>{spoken_languages.map(lang => <span key={lang.english_name}>{lang.english_name}</span>)}</dd>
              </div>
            </dl>
          </div>
          <div className="col col-2">
            <figure className="img-poster">
              <img src={`${IMAGES_URL}w500${poster_path})`} />
            </figure>
          </div>
        </div>
        <hr />
        <div className="related-content">
          <h4 className="heading">More Like This</h4>
          <div className="related-movies-container flex">
            {recommendations.results.slice(0, 9).map(movie =>
              <MovieCard key={movie.id} result={movie} media={media} variant="series" />
            )}
          </div>
        </div>
      </section>
    </motion.div>
  )
}
