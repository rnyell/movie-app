import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { motion } from "framer-motion"
import { useWindowOffsets } from "@utils/hooks"
import { IMAGES_URL } from "@services"
import { useMediaDetails } from "@services/hooks"
import { formatRuntime, getMovieGenres, getMovieDirector } from "@services/movie-utils"
import { pageTransitionVariants, defaultVariantsLabel } from "@utils/motions"
import { SelectedMovieSkeleton } from "@components/ui/skeletons"
import MovieCard from "@components/movie/movie-card"
import Overview from "@components/movie/details/overview"
import Rates from "@components/movie/details/rates"
import Casts from "@components/movie/details/casts"
import WatchButton from "@components/ui/buttons/watch-btn"
import FaveButton from "@components/ui/buttons/fave-btn"
import BookmarkButton from "@components/ui/buttons/bookmark-btn"
import Pictures from "@components/selected-movie/pictures"
import Trailers from "@components/selected-movie/trailers"

const imgUrlInit = {
  width: "w500",
  path: "/",
  toString() {
    return `${this.width}${this.path}`
  }
}


export default function SelectedMovie() {
  const {windowWidth} = useWindowOffsets()
  const location = useLocation()
  const {id} = useParams()
  const media = "movie"
  const prevUrl = location?.state?.prevUrl
  const {mediaDetails, isLoading} = useMediaDetails(media, id)
  const [imgUrl, setImgUrl] = useState(imgUrlInit)

  const {
    title,
    imdb_id,
    // status,
    release_date,
    runtime,
    poster_path,
    backdrop_path,
    overview,
    // tagline,
    genres,
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

  // console.log(mediaDetails)
  // credits is undefined. why??
  // const { cast } = credits
  // console.log(cast)

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
      className="selected-media selected-movie"
      variants={pageTransitionVariants}
      {...defaultVariantsLabel}
    >
      <section className="poster-wrapper isolated-stack ::after-abs">
        <div className="bg-poster" style={{backgroundImage: `url(${IMAGES_URL}${imgUrl})`}} />
        <div className="main-details flex-col w-100">
          <h1 className="main-title">{title}</h1>
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
            <FaveButton />
            <BookmarkButton item={{id, media}} />
          </div>
        </div>
      </section>
      <section className="details-wrapper grid">
        <div className="information-table">
          <div className="col col-1">
            <Rates id={imdb_id} variant="verbose" />
            <dl>
              <div className="td">
                <dt>Director:</dt>
                <dd>{getMovieDirector(credits.crew)}</dd>
              </div>
              <div className="td">
                <dt>Writer:</dt>
                <dd>{getMovieDirector(credits.crew)}</dd>
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
              <div className="td">
                <dt>Budget:</dt>
                <dd>{budget}</dd>
              </div>
              <div className="td">
                <dt>Revenue:</dt>
                <dd>{revenue}</dd>
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
        <Casts casts={credits.cast} mode="list" />
        <hr />
        <div className="visuals">
          <Trailers videos={videos} />
          <Pictures images={images} />
        </div>
        <hr />
        <div className="related-content">
          <h4 className="heading">More Like This</h4>
          <div className="related-movies-container flex">
            {recommendations.results.slice(0, 9).map(movie =>
              <MovieCard key={movie.id} result={movie} media={media} variant="common" />
            )}
          </div>
        </div>
      </section>
    </motion.div>
  )
}
