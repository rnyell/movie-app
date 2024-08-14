import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { IMAGES_URL } from "@services"
import { useMediaDetails } from "@services/hooks"
import { formatReleaseDate } from "@services/movie-utils"
import { useAppContext } from "@src/store"
import { ArrowTopRightOnSquareIcon, ChevronRightIcon, ChevronLeftIcon } from "@heroicons/outline"
import { ListPlusIcon, IMDB2Icon, RottenTomatoesIcon } from "@lib/ui/icons"
import { Button, Dot } from "@lib/ui/components"
import WatchButton from "@components/buttons/watch-btn"
import { Genres, Rates } from "@components/movie-details"
import { SwiperSkeleton } from "@components/skeletons"

import classes from "./swiper.module.css"


export default function Swiper({
  result,
  posters,
  currIndex,
  showNextMovie,
  showPrevMovie
}) {
  const media = "movie"
  const { id } = result
  const { isLoading, mediaDetails } = useMediaDetails(media, id)
  const { modalDispatch } = useAppContext()
  const navigate = useNavigate()

  const {
    title,
    release_date,
    genres,
    vote_average: rate,
  } = mediaDetails

  const backgroundImage = `url("${IMAGES_URL}original${posters[currIndex]}")`

  function handleNextMovie() {
    showNextMovie(1)
    prevIndex.current = currIndex
  }

  function handlePrevMovie() {
    showPrevMovie(1)
    prevIndex.current = currIndex
  }

  function onSelectMovie() {
    navigate(`/movies/${(id)}`)
  }

  function onSaveMovie() {
    modalDispatch({
      type: "save",
      data: { id, media }
    })
  }

  /* -------------------------------- */
  /* animation-related */
  const prevIndex = useRef(0)
  const isIncremented = currIndex > prevIndex.current
  const direction = isIncremented ? 1 : -1

  const posterMotion = {
    initial: direction => ({
      opacity: 0.1,
      x: direction * 100,
    }),
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        bounce: 0.275,
        duration: 0.5,
        delay: 0.075,
      }
    },
    exit: direction => ({
      opacity: 0,
      x: direction * -120,
      transition: {
        duration: 0.375
      }
    })
  }

  const detailsMotion = {
    initial: direction => ({
      opacity: 0.2,
      x: direction * 75,
    }),
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        duration: 0.375,
        delay: 0.05,
      }
    },
    exit: direction => ({
      opacity: 0,
      x: direction * -90,
      transition: {
        duration: 0.25
      }
    })
  }
  /* -------------------------------- */

  if (isLoading) {
    return <SwiperSkeleton />
  }

  return (
    <AnimatePresence initial={false} custom={direction}>
      <motion.div className={classes.swiper} key={id}>
        <motion.div
          className={classes.bgPoster}
          style={{backgroundImage}}
          {...posterMotion}
          custom={direction}
        />
        <div className="align-center gap-1.5 ml-auto">
          <Button
            variants="solid-secondary"
            size="square-md"
            customStyles="rounded-full bg-rgb-800"
            iconOnly
            svg={<ChevronLeftIcon />}
            onClick={handlePrevMovie}
          />
          <Button
            variants="solid-secondary"
            size="square-md"
            customStyles="rounded-full bg-rgb-800"
            iconOnly
            svg={<ChevronRightIcon />}
            onClick={handleNextMovie}
          />
        </div>
        <motion.div className="mt-auto py-12 flex-col gap-2" {...detailsMotion} custom={direction}>
          <Genres genres={genres} media={media} shape="chip" />
          <h1 className={classes.title}>{title}</h1>
          <div className="align-center gap-3">
          <span className={classes.releaseDate}>{formatReleaseDate(release_date)}</span>
          <Dot scale="1.5" />
          <Rates
            rate={rate}
            variant="star"
            starSize="icon-xl"
            starSvg={<IMDB2Icon />}
            customStyles="fs-larger"
          />
          </div>
        </motion.div>
        <div className="align-center gap-3">
          <WatchButton
            item={{id, media, title}}
            text="Watch"
            size="lg"
            customStyles="grow rounded-xl"
          />
          <Button
            variants="outline-blured"
            size="square-lg"
            customStyles="rounded-xl"
            iconOnly
            iconSize="lg"
            svg={<ArrowTopRightOnSquareIcon />}
            onClick={onSelectMovie}
          />
          <Button
            variants="outline-blured"
            size="square-lg"
            customStyles="rounded-xl"
            iconOnly
            iconSize="lg"
            svg={<ListPlusIcon />}
            onClick={onSaveMovie}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
