import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { IMAGES_URL } from "@services"
import { useMediaDetails } from "@services/hooks"
import { getMovieGenres, getMovieDirector, formatReleaseDate } from "@services/movie-utils"
import { useAuth } from "@src/auth/auth-context"
import { HeroMovieLoadingSkeleton } from "@components/skeletons"
import { ChevronRightIcon, ChevronLeftIcon, ArrowLongRightIcon, BookmarkIcon, ArrowTopRightOnSquareIcon } from "@heroicons/outline"
import { ShareIcon } from "@heroicons/solid"
import { ListPlusIcon } from "@src/lib/ui/icons"
import { Button, Icon } from "@src/lib/ui/components"
import ListsModal from "@components/modals/lists-modal"
import Casts from "@components/movie-details/casts"
import WatchButton from "@components/buttons/watch-btn"
import Rates from "@components/movie-details/rates"


export default function HeroMovie({ result, showNextMovie, showPrevMovie }) {
  const media = "movie"
  const id = result.id
  const {isLoading, mediaDetails} = useMediaDetails(media, id)
  // const [key, setKey] = useState(0) // used by <AnimatePresence>
  const [listsModal, setListsModal] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // setKey(key + 1)
    console.log("hero movie re-rendered")
  }, [result.id])

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


  if (isLoading) {
    return <HeroMovieLoadingSkeleton />
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <div className="hero-movie">
        <div className="grid-container">
          <div className="ambient">
            <img className="unselectable" src={`${IMAGES_URL}original${bg_path}`} draggable={false} />
          </div>
          <div
            className="bg-poster"
            style={{backgroundImage: `url("${IMAGES_URL}original${bg_path}")`}}
          />
          <div className="main-details">
            <h2 className="title">{title}</h2>
            <div className="align-center">
              <span className="release-date">
                {formatReleaseDate(release_date)}
              </span>
              <i className="dot">&#x2022;</i>
              <div className="rate-container">
                <Rates rate={rate} variant="star" />
              </div>
              {/* <p className="genres">{getMovieGenres(genres)}</p> */}
            </div>
          </div>
          <div className="main-btns flex">
            <WatchButton
              item={{id, title, media}}
              // iconSize="md"
              customStyles="px-7 rounded-2xl"
              text="Watch"
            />
            <Button
              variants="outline-blured"
              customStyles="rounded-2xl"
              onClick={handleSelectedMovie}
            >
              <Icon svg={<ArrowTopRightOnSquareIcon />} />
              Details
            </Button>
            <Button
              variants="outline-blured"
              customStyles="rounded-2xl"
              onClick={() => setListsModal(true)}
            >
              <Icon svg={<ListPlusIcon />} size="md" />
              Save
            </Button>
          </div>
          {/* <p className="tagline">{tagline}</p> */}
          <div className="director">
            <p>Directed by</p>
            <p className="director-name">{getMovieDirector(credits.crew)}</p>
          </div>
          <div className="casts-container">
            <Casts casts={credits.cast} mode="drawer" />
          </div>
          <div className="next-prev-btns">
            <Button
              variants="outline-blured"
              size="square-md"
              customStyles="rounded-2xl"
              onClick={() => showPrevMovie(1)}
            >
              <Icon svg={<ChevronLeftIcon className="stroke-3" />} size="md" />
            </Button>
            <Button
              variants="outline-blured"
              size="square-md"
              customStyles="rounded-2xl"
              onClick={() => showNextMovie(1)}
            >
              <Icon svg={<ChevronRightIcon className="stroke-3" />} size="md" />
            </Button>
          </div>
        </div>
      </div>
      {listsModal && <ListsModal item={{id, media}} setModal={setListsModal} />}
    </AnimatePresence>
  )
}

function DisplayedModal() {
  const { session } = useAuth()

  useEffect(() => {

  }, [])
}
