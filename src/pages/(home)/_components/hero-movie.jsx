import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { IMAGES_URL } from "@services"
import { useMediaDetails } from "@services/hooks"
import { formatReleaseDate } from "@services/movie-utils"
import { useAppContext } from "@src/store"
import { HeroMovieSkeleton } from "@components/skeletons"
import { ArrowTopRightOnSquareIcon, ChevronRightIcon, ChevronLeftIcon } from "@heroicons/outline"
import { ListPlusIcon } from "@lib/ui/icons"
import { Button, Icon, Dot } from "@lib/ui/components"
import { Genres, Casts, Rates } from "@components/movie-details"
import WatchButton from "@components/buttons/watch-btn"

import classes from "./hero.module.css"

export default function HeroMovie({
  result,
  currIndex,
  showNextMovie,
  showPrevMovie,
}) {
  const id = result.id
  const media = "movie"
  const { isLoading, mediaDetails } = useMediaDetails(media, id)
  const { modalDispatch } = useAppContext()
  const navigate = useNavigate()

  const {
    title,
    release_date,
    genres,
    vote_average: rate,
    backdrop_path: bg_path,
    credits,
    // runtime, // overview, // poster_path,
  } = mediaDetails

  const backgroundImage = `url("${IMAGES_URL}original${bg_path}")`

  function onSelectMovie() {
    navigate(`/movies/${id}`)
  }

  function onSaveMovie() {
    modalDispatch({
      type: "save",
      data: { id, media },
    })
  }

  function handleNextMovie() {
    showNextMovie(1)
    prevIndex.current = currIndex
  }

  function handlePrevMovie() {
    showPrevMovie(1)
    prevIndex.current = currIndex
  }

  /* -------------------------------- */
  /* animation-related */
  const prevIndex = useRef(0)
  const isIncremented = currIndex > prevIndex.current
  const direction = isIncremented ? 1 : -1

  const posterMotion = {
    initial: (direction) => ({
      opacity: 0.1,
      x: direction * 50,
    }),
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        bounce: 0.2,
        duration: 0.375,
        delay: 0.075,
      },
    },
    exit: (direction) => ({
      opacity: 0,
      x: direction * -50,
      transition: {
        duration: 0.475,
      },
    }),
  }

  const detailsMotion = {
    initial: (direction) => ({
      opacity: 0.2,
      x: direction * 50,
    }),
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        duration: 0.575,
        delay: 0.05,
      },
    },
    exit: (direction) => ({
      opacity: 0,
      x: direction * -50,
      transition: {
        duration: 0.35,
      },
    }),
  }
  /* -------------------------------- */

  return (
    <AnimatePresence mode="sync" initial={false} custom={direction}>
      <div className={classes.heroMovie}>
        {isLoading ? (
          <HeroMovieSkeleton />
        ) : (
          <motion.div className={classes.gridContainer} key={id}>
            <div className={classes.ambient} style={{ backgroundImage }} />
            <motion.div
              className={classes.bgPoster}
              style={{ backgroundImage }}
              {...posterMotion}
              custom={direction}
            />
            <motion.div
              className={classes.details}
              {...detailsMotion}
              custom={direction}
            >
              <h2 className={classes.title}>{title}</h2>
              <div className="mt-4 align-center gap-3">
                <span className={classes.releaseDate}>
                  {formatReleaseDate(release_date)}
                </span>
                <Dot scale="1.5" />
                <Rates
                  rate={rate}
                  variant="star"
                  color="white"
                  starSize="icon-md"
                  className="fs-larger"
                />
                <Dot scale="1.5" />
                <Genres genres={genres} media={media} shape="chip" />
              </div>
            </motion.div>
            <div className={classes.castsContainer}>
              <Casts
                casts={credits.cast}
                variant="drawer"
                withHeading={false}
              />
            </div>
            <div className={`${classes.btns} flex gap-3`}>
              <WatchButton
                item={{ id, title, media }}
                className="px-7 rounded-2xl"
                text="Watch"
              />
              <Button
                variant="outline-blured"
                className="rounded-2xl"
                onClick={onSelectMovie}
              >
                <Icon svg={<ArrowTopRightOnSquareIcon />} />
                Details
              </Button>
              <Button
                variant="outline-blured"
                className="rounded-2xl"
                onClick={onSaveMovie}
              >
                <Icon svg={<ListPlusIcon />} size="md" />
                Save
              </Button>
              <Button
                variant="outline-blured"
                size="md"
                className="ml-auto rounded-2xl"
                isSquare
                onClick={handlePrevMovie}
              >
                <Icon svg={<ChevronLeftIcon className="stroke-3" />} size="md" />
              </Button>
              <Button
                variant="outline-blured"
                size="md"
                className="rounded-2xl"
                isSquare
                onClick={handleNextMovie}
              >
                <Icon svg={<ChevronRightIcon className="stroke-3" />} size="md" />
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  )
}
