import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useWindowOffsets } from "@lib/hooks"
import { IMAGES_URL } from "@services"
import { useMediaDetails } from "@services/hooks"
import { formatReleaseDate, formatRuntime } from "@services/movie-utils"
import { Snap, Dot } from "@lib/ui/components"
import Page from "@components/layouts/page"
import { SelectedMovieSkeleton } from "@components/skeletons"
import { Overview, Casts, Rates, Genres } from "@components/movie-details"
import MovieCard from "@components/movie-cards/movie-card"
import NetworkLogo from "../_components/network-logo"
import Languages from "../_components/languages"
import Countries from "../_components/countries"
import Trailers from "../_components/trailers"
import Pictures from "../_components/pictures"

const imgUrlInit = {
  width: "w500",
  path: "/",
  toString() {
    return `${this.width}${this.path}`
  }
}


export default function SelectedSeries() {
  const media = "series"
  const { id } = useParams()
  const { mediaDetails, isLoading } = useMediaDetails("tv", id)
  const { windowWidth } = useWindowOffsets()
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
    <Page viewTransition headless>
      <div className="selected-media selected-series">
        <section className="poster-wrapper isolated-stack ::after-abs">
          <div className="bg-poster" style={{backgroundImage: `url(${IMAGES_URL}${imgUrl})`}} />
          <div className="main-details flex-col w-full">
            <h1 className="main-title">{name}</h1>
            <div className="details">
              <span className="release-date">{formatReleaseDate(first_air_date)}</span>
              <Dot />
              <span className="seasons-number">
                {number_of_seasons} {`${number_of_seasons > 1 ? "Seasons" : "Season"}`}
              </span>
              <Dot />
              <Genres
                genres={genres}
                media={media}
                shape="chip"
                className="color-neutral-300"
              />
            </div>
            <Overview
              text={overview}
              lines="unset"
              className="mb-8 text-base"
            />
            <div className="sm-credits">
              <Casts
                casts={credits.cast}
                mode="names"
                variant="list"
                count={5}
                withImage={false}
                headingText="Starring:"
              />
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
                <div className="season shrink-0 min-w-0" key={season.name}>
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
          <Casts
            casts={credits.cast}
            mode="profile"
            variant="list"
            count={10}
            headingText="Casts"
          />
          <div className="information-table">
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
                  <dt>{production_countries?.length > 1 ? "Countries:" : "Country:"}</dt>
                  <dd>
                    <Countries countries={production_countries} />
                  </dd>
                </div>
                <div className="td">
                  <dt>{spoken_languages?.length > 1 ? "Languages:" : "Language:"}</dt>
                  <dd>
                    <Languages languages={spoken_languages} />
                  </dd>
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
              <Snap.Container className="h-full">
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
    </Page>
  )
}
