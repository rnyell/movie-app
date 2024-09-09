import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { IMAGES_URL } from "@services"
import { formatRuntime, getMovieDirector } from "@services/movie-utils"
import { useWindowOffsets } from "@lib/hooks"
import { useMediaDetails } from "@services/hooks"
import { formatLongNumber } from "@lib/utils"
import { Snap, Dot } from "@lib/ui/components"
import Page from "@components/layouts/page"
import { SelectedMovieSkeleton } from "@components/skeletons"
import { Overview, Casts, Rates, Genres } from "@components/movie-details"
import { WatchButton, BookmarkButton, FaveButton } from "@components/buttons"
import MovieCard from "@components/movie-cards/movie-card"
import Languages from "../_components/languages"
import Companies from "../_components/companies"
import Countries from "../_components/countries"
import Pictures from "../_components/pictures"
import Trailers from "../_components/trailers"

const imgUrlInit = {
  width: "w500",
  path: "/",
  toString() {
    return `${this.width}${this.path}`
  },
}

export default function SelectedMovie() {
  const media = "movie"
  const { id } = useParams()
  const { mediaDetails, isLoading } = useMediaDetails(media, id)
  const { windowWidth } = useWindowOffsets()
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
    credits, // { cast: [], crew: [] }
    videos, // { results: [ id, key ] }
    images, // { backdrops: [ file_path ], posters: [], logos: [] }
    belongs_to_collection, // {id, name, poster_path, backdrop_path},
    recommendations, // { results: [] }
    budget,
    revenue,
    production_companies, // [ {id, name, logo_path} ]
    production_countries,
    spoken_languages,
  } = mediaDetails

  useEffect(() => {
    handleResize()
  }, [mediaDetails, windowWidth])

  function handleResize() {
    if (windowWidth < 620) {
      setImgUrl({
        ...imgUrl,
        width: "w500",
        path: poster_path,
      })
    } else {
      setImgUrl({
        ...imgUrl,
        width: "original",
        path: backdrop_path,
      })
    }
  }

  if (isLoading) {
    return <SelectedMovieSkeleton />
  }

  return (
    <Page viewTransition headless>
      <div className="selected-media selected-movie">
        <section className="poster-wrapper isolated-stack ::after-abs">
          <div
            className="bg-poster"
            style={{ backgroundImage: `url(${IMAGES_URL}${imgUrl})` }}
          />
          <div className="main-details flex-col w-full">
            <h1 className="main-title">{title}</h1>
            <div className="details">
              <span className="release-date">{release_date?.slice(0, 4)}</span>
              <Dot />
              <span className="runtime">{formatRuntime(runtime)}</span>
              <Dot />
              <Genres
                genres={genres}
                media={media}
                shape="chip"
                customStyles="color-neutral-300"
              />
            </div>
            <Overview
              text={overview}
              lines="5"
              fontSize="fs-lg"
              customStyles="mb-8"
            />
            <div className="cta-btns flex">
              <WatchButton
                item={{ id, title, media }}
                className="rounded-full"
                text="Watch"
                size="xl"
                iconSize="xl"
              />
              <FaveButton item={{ id, media }} />
              <BookmarkButton
                item={{ id, media }}
                className="rounded-full"
                variant="outline-bold"
                size="xl"
                iconSize="xl"
              />
            </div>
          </div>
        </section>
        <section className="details-wrapper flex-col">
          <div className="information-table">
            <div className="col col-1">
              <Rates extId={imdb_id} variant="verbose" />
              <dl>
                <div className="td">
                  <dt>Director:</dt>
                  <dd>
                    <p className="w-max">{getMovieDirector(credits.crew)}</p>
                  </dd>
                </div>
                <div className="td">
                  <dt>
                    {production_countries?.length > 1
                      ? "Countries:"
                      : "Country:"}
                  </dt>
                  <dd>
                    <Countries countries={production_countries} />
                  </dd>
                </div>
                <div className="td">
                  <dt>
                    {spoken_languages?.length > 1 ? "Languages:" : "Language:"}
                  </dt>
                  <dd>
                    <Languages languages={spoken_languages} />
                  </dd>
                </div>
                <div className="td">
                  <dt>
                    {production_companies?.length > 1
                      ? "Companies:"
                      : "Company:"}
                  </dt>
                  <dd>
                    <Companies companies={production_companies} />
                  </dd>
                </div>
                <div className="td">
                  <dt>Budget:</dt>
                  <dd>{formatLongNumber(budget)}</dd>
                </div>
                <div className="td">
                  <dt>Revenue:</dt>
                  <dd>{formatLongNumber(revenue)}</dd>
                </div>
              </dl>
            </div>
            <div className="col col-2">
              <figure className="img-poster">
                <img src={`${IMAGES_URL}w500${poster_path})`} />
              </figure>
            </div>
          </div>
          <Casts
            casts={credits.cast}
            count={11}
            variant="list"
            mode="profile"
            headingText="Casts"
          />
          <div className="visuals">
            <Trailers videos={videos} />
            <Pictures images={images} />
          </div>
          <div className="related-content">
            <h4 className="heading">More Like This</h4>
            <div className="related-movies">
              <Snap.Container className="h-full">
                {recommendations.results.slice(0, 9).map((movie) => (
                  <Snap.Item key={movie.id}>
                    <MovieCard result={movie} media={media} variant="common" />
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
