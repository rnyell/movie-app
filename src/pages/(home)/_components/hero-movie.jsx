import { useEffect, useState } from "react"
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
import WatchButton from "@components/buttons/watch-btn"
import { Genres, Casts, Rates } from "@components/movie-details"


export default function HeroMovie({ result, showNextMovie, showPrevMovie }) {
  const media = "movie"
  const id = result.id
  const { isLoading, mediaDetails } = useMediaDetails(media, id)
  const { modalDispatch } = useAppContext()
  const navigate = useNavigate()

  const {
    title,
    release_date,
    // runtime,
    genres,
    vote_average: rate,
    // overview,
    // poster_path,
    backdrop_path: bg_path,
    credits,
  } = mediaDetails

  function onSelectMovie() {
    navigate(`/movies/${(id)}`)
  }

  function onSaveMovie() {
    modalDispatch({
      type: "save",
      data: { id, media }
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


  if (isLoading) {
    return <HeroMovieSkeleton />
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <div className="hero-movie" /*key={id}*/>
        <div className="grid-container">
          <div className="ambient">
            {/* TODO bg instead og img? */}
            <img className="unselectable" src={`${IMAGES_URL}original${bg_path}`} draggable={false} />
          </div>
          <div
            className="bg-poster"
            style={{backgroundImage: `url("${IMAGES_URL}original${bg_path}")`}}
          />
          <div className="main-details">
            <h2 className="title">{title}</h2>
            <div className="mt-4 align-center gap-3">
              <span className="release-date">
                {formatReleaseDate(release_date)}
              </span>
              <Dot scale="1.5" />
              <Rates
                rate={rate}
                variant="star"
                color="white"
                starSize="icon-md"
                customStyles="fs-larger"
              />
              <Dot scale="1.5" />
              <Genres genres={genres} media={media} shape="chip" />
            </div>
          </div>
          <div className="main-btns flex gap-3">
            <WatchButton
              item={{id, title, media}}
              customStyles="px-7 rounded-2xl"
              text="Watch"
            />
            <Button
              variants="outline-blured"
              customStyles="rounded-2xl"
              onClick={onSelectMovie}
            >
              <Icon svg={<ArrowTopRightOnSquareIcon />} />
              Details
            </Button>
            <Button
              variants="outline-blured"
              customStyles="rounded-2xl"
              onClick={onSaveMovie}
            >
              <Icon svg={<ListPlusIcon />} size="md" />
              Save
            </Button>
          </div>
          <div className="casts-container">
            <Casts
              casts={credits.cast}
              variant="drawer"
              withHeading={false}
            />
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
    </AnimatePresence>
  )
}
