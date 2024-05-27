import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/outline"
import { transformTitleToURL } from "@utils/utils"
import { getMovieDetails, IMAGES_URL } from "@services"
import { getMovieGenres, getMovieDirector, formatReleaseDate } from "@services/movie-utils"
import { defaultVariantsLabel } from "@utils/motions"
import { useUserState } from "@src/store/app-context"
import { HeroMovieLoadingSkeleton } from "@components/skeletons"
import Casts from "@components/movie/details/casts"
import BookmarkButton from "@components/buttons/bookmark-btn"
import WatchButton from "@components/buttons/watch-btn"
import Rates from "@components/movie/details/rates"


export default function HeroMovie({ movie, showNextMovie, showPrevMovie }) {
  const {userState, userDispatch} = useUserState()
  const [isLoading, setIsLoading] = useState(true)
  const [movieDetails, setMovieDetails] = useState({}) //? useState({}) is fine but useState() caues error!
  const [key, setKey] = useState(0) // for <AnimatePresence> purposes
  const location = useLocation()
  const navigate = useNavigate()

  const media = "movie"

  useEffect(() => {
    loadData()
    setKey(key + 1)
    console.log("hero movie re-rendered")
  }, [movie.id])

  async function loadData() {
    const data = await getMovieDetails(movie.id)
    setMovieDetails(data)
    setIsLoading(false)
  }

  const {
    id,
    title,
    release_date,
    // runtime,
    genres,
    vote_average: rate,
    overview,
    tagline,
    poster_path,
    backdrop_path: bg_path,
    credits,
  } = movieDetails

  // console.log(movieDetails)

  // better name?
  function handleSelectedMovie() {
    navigate(`/${transformTitleToURL(title)}`, {
      state: {
        id,
        media,
        prevUrl: location.pathname + location.search,
      }
    })
  }

  const staggerChildren = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    },
    exit: {}
  }

  const itemsAVariants = {
    initial: {
      opacity: 0.2,
      y: -18
    },
    animate: {
      opacity: 1,
      y: 0
    },
    exit: {
      opacity: 0,
      y: -13
    },
  }

  const itemsBVariants = {
    initial: {
      opacity: 0.15,
      y: 8
    },
    animate: {
      opacity: 1,
      y: 0
    },
    exit: {
      opacity: 0,
      y: 5
    },
  }

  return isLoading ? (
    <HeroMovieLoadingSkeleton />
  ) : (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        className="hero-movie"
        key={key}
        variants={staggerChildren}
        {...defaultVariantsLabel}
      >
        <div className="grid-container">
          <motion.div
            className="ambient"
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0.1 }}
          >
            <img className="unselectable" src={`${IMAGES_URL}original${bg_path}`} draggable={false} />
          </motion.div>
          <motion.div
            className="bg-poster"
            style={{backgroundImage: `url("${IMAGES_URL}original${bg_path}")`}}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.4 }}
          />
          <motion.div
            className="grid-item-title"
            variants={staggerChildren}
          >
            <motion.h2 className="title" variants={itemsAVariants}>{title}</motion.h2>
            <motion.span className="release-date" variants={itemsBVariants}>
              {formatReleaseDate(release_date)}
            </motion.span>
            <motion.p className="genres" variants={itemsBVariants}>
              {getMovieGenres(genres)}
            </motion.p>
          </motion.div>
          <div className="cta-btns">
            <WatchButton data={{id, media, prevUrl: location.pathname + location.search}} />
            <button className="btn btn-shared info-btn" onClick={handleSelectedMovie}>
              <span>More Info</span>
            </button>
            <BookmarkButton item={{id, media}} />
          </div>
          <p className="tagline">{tagline}</p>
          <motion.div className="rate-container" variants={itemsBVariants}>
            <Rates rate={rate} variant="star" />
          </motion.div>
          <div className="director">
            <p>Directed by</p>
            <p className="director-name">{getMovieDirector(credits.crew)}</p>
          </div>
          <div className="casts-container">
            <Casts casts={credits.cast} mode="drawer" />
          </div>
          <div className="next-prev-btns">
            <button className="btn btn-shared" onClick={() => showPrevMovie(1)}>
              <ChevronLeftIcon />
            </button>
            <button className="btn btn-shared" onClick={() => showNextMovie(1)}>
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
