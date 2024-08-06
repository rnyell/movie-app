import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useWindowOffsets } from "@lib/hooks"
import { IMAGES_URL } from "@services"
import { useMediaDetails } from "@services/hooks"
import { formatReleaseDate, formatRuntime, getMovieGenres } from "@services/movie-utils"
import { ViewTransition } from "@lib/motion"
import { Snap } from "@lib/ui/components"
import { SelectedMovieSkeleton } from "@components/skeletons"
import { Overview, Casts, Rates, Genres } from "@components/movie-details"
import MovieCard from "@components/movie-cards/movie-card"
import NetworkLogo from "../_components/network-logo"
import Pictures from "../_components/pictures"
import Trailers from "../_components/trailers"

const imgUrlInit = {
  width: "w500",
  path: "/",
  toString() {
    return `${this.width}${this.path}`
  }
}


export default function SelectedSeries() {
  const {windowWidth} = useWindowOffsets()
  const {id} = useParams()
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
    <ViewTransition>
      <div className="selected-media selected-series">
        <section className="poster-wrapper isolated-stack ::after-abs">
          <div className="bg-poster" style={{backgroundImage: `url(${IMAGES_URL}${imgUrl})`}} />
          <div className="main-details flex-col w-100%">
            <h1 className="main-title">{name}</h1>
            <div className="details">
              <span className="release-date">{formatReleaseDate(first_air_date)}</span>
              <i className="dot">&#x2022;</i>
              <span className="seasons-number">
                {number_of_seasons} {`${number_of_seasons > 1 ? "Seasons" : "Season"}`}
              </span>
              <i className="dot">&#x2022;</i>
              <Genres genres={genres} media={media} customStyles="color-neutral-300" />
            </div>
            <Overview
              text={overview}
              lines="unset"
              fontSize="fs-lg"
              customStyles="mb-8"
            />
            <div className="sm-credits">
              <Casts casts={credits.cast} mode="names" />
              <div className="creators flex">
                <h6 className="heading">Creators:</h6>
                {created_by.map(creator => <p className="creator-name" key={creator.name}>{creator.name}<span>,</span></p>)}
              </div>
            </div>
          </div>
        </section>
        <section className="details-wrapper flex-col">
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
          <div className="visuals">
            <Trailers videos={videos} />
            <Pictures images={images} />
          </div>
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
          <div className="related-content">
            <h4 className="heading">More Like This</h4>
            <div className="related-movies">
              <Snap.Container customStyles="h-100%">
                {recommendations.results.slice(0, 9).map(movie => (
                  <Snap.Item key={movie.id}>
                    <MovieCard result={movie} media={media} variant="series" />
                  </Snap.Item>
                ))}
              </Snap.Container>
            </div>
          </div>
        </section>
      </div>
    </ViewTransition>
  )
}
