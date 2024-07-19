import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/outline"
import { IMAGES_URL } from "@services"
import { useMediaDetails } from "@services/hooks"
import { getMovieGenres, getMovieDirector, formatReleaseDate } from "@services/movie-utils"
import { defaultVariantsLabel } from "@lib/motion/motions"
import { HeroMovieLoadingSkeleton } from "@components/ui/skeletons"
import Casts from "@components/movie/details/casts"
import BookmarkButton from "@components/ui/buttons/bookmark-btn"
import WatchButton from "@components/ui/buttons/watch-btn"
import Rates from "@components/movie/details/rates"
import ListsModal from "@components/ui/modals/lists-modal"
import { useUserContext } from "@src/store/user-context"
import { Button, Icon } from "@src/lib/ui/components"


export default function HeroMovie({ movie, showNextMovie, showPrevMovie }) {
  const {userState} = useUserContext()
  // console.log(userState.session, '??')
  const id = movie.id
  const media = "movie"
  const {isLoading, mediaDetails} = useMediaDetails(media, id)
  const [key, setKey] = useState(0) // used by <AnimatePresence>
  const [listsModal, setListsModal] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setKey(key + 1)
    console.log("hero movie re-rendered")
  }, [movie.id])

  const {
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
  } = mediaDetails

  // console.log(mediaDetails)

  function handleSelectedMovie() {
    navigate(`/movies/${(id)}`)
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
          <div className="ambient">
            <img className="unselectable" src={`${IMAGES_URL}original${bg_path}`} draggable={false} />
          </div>
          <div
            className="bg-poster"
            style={{backgroundImage: `url("${IMAGES_URL}original${bg_path}")`}}
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
          <div className="cta-btns flex">
            <WatchButton
              item={{id, title, media}}
              size="md"
              iconSize="md"
              customStyles="rounded-lg"
              text="Watch"
            />
            <Button
              variants="blured-1"
              size="md"
              customStyles="rounded-lg"
              onClick={handleSelectedMovie}
            >
              More Info
            </Button>
            <BookmarkButton
              item={{id, media}}
              setModal={setListsModal}
              variants="blured-1"
              size="icon-md"
              iconSize="md"
              customStyles="rounded-lg"
            />
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
            <Button
              variants="blured-1"
              size="icon-md"
              customStyles="rounded-lg"
              onClick={() => showPrevMovie(1)}
            >
              <Icon svg={<ChevronLeftIcon className="stroke-3" />} size="md" />
            </Button>
            <Button
              variants="blured-1"
              size="icon-md"
              customStyles="rounded-lg"
              onClick={() => showNextMovie(1)}
            >
              <Icon svg={<ChevronRightIcon className="stroke-3" />} size="md" />
            </Button>
          </div>
        </div>
      </motion.div>
      {listsModal && <ListsModal item={{id, media}} setModal={setListsModal} />}
    </AnimatePresence>
  )
}
