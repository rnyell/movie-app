import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useWindowOffsets } from "@lib/hooks"
import { IMAGES_URL } from "@services"
import { formatRuntime, getMovieDirector } from "@services/movie-utils"
import { useMediaDetails } from "@services/hooks"
import { ViewTransition } from "@lib/motion"
import { Snap, Dot } from "@lib/ui/components"
import { SelectedMovieSkeleton } from "@components/skeletons"
import { Overview, Casts, Rates, Genres } from "@components/movie-details"
import { WatchButton, BookmarkButton, FaveButton } from "@src/components/buttons"
import MovieCard from "@components/movie-cards/movie-card"
import Pictures from "../_components/pictures"
import Trailers from "../_components/trailers"

const imgUrlInit = {
  width: "w500",
  path: "/",
  toString() {
    return `${this.width}${this.path}`
  }
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
    <ViewTransition>
      <div className="selected-media selected-movie">
        <section className="poster-wrapper isolated-stack ::after-abs">
          <div className="bg-poster" style={{backgroundImage: `url(${IMAGES_URL}${imgUrl})`}} />
          <div className="main-details flex-col w-100%">
            <h1 className="main-title">{title}</h1>
            <div className="details">
              <span className="release-date">{release_date?.slice(0, 4)}</span>
              <Dot />
              <span className="runtime">{formatRuntime(runtime)}</span>
              <Dot />
              <Genres genres={genres} media={media} customStyles="color-neutral-300" />
            </div>
            <Overview text={overview} lines="unset" fontSize="fs-lg" customStyles="mb-8" />
            <div className="cta-btns flex">
              <WatchButton
                item={{id, title, media}}
                text="Watch"
                size="xl"
                iconSize="xl"
                customStyles="rounded-full"
              />
              <FaveButton item={{id, media}} />
              <BookmarkButton
                item={{id, media}}
                variants="outline-bold"
                size="square-xl"
                iconSize="xl"
                customStyles="rounded-full"
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
                  <dd>
                    {spoken_languages.map(lang => (
                      <span key={lang.english_name}>
                        {lang.english_name}<i>, </i>
                      </span>
                    ))}
                  </dd>
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
          <Casts
            casts={credits.cast}
            count={12}
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
              <Snap.Container customStyles="h-100%">
                {recommendations.results.slice(0, 9).map(movie => (
                  <Snap.Item key={movie.id}>
                    <MovieCard result={movie} media={media} variant="common" />
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
