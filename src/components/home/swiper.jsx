import { useEffect, useState } from "react"
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion"


const SCALE_FACTOR = 0.04
const RIGHT_X_STEPS = 20

export default function Swiper({
  movie,
  currIndex,
  setCurrIndex,
  showNextMovie,
  showPrevMovie
}) {
  const [cloned, reorder] = useState(movie.toReversed().slice(-5))
  
  return (
    <div className="swiper-container">
      <div className="swiper">
        <AnimatePresence initial={false} mode="popLayout">
          {cloned.map((film, idx) => {
            const isFront = idx === cloned.length - 1
            return (
              <SwiperCard
                key={film.id}
                cloned={cloned}
                reorder={reorder}
                isFront={isFront}
                idx={idx}
                currIndex={currIndex}
                setCurrIndex={setCurrIndex}
                showNextMovie={showNextMovie}
                showPrevMovie={showPrevMovie}
                poster_path={film.poster_path}
              />
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}

function SwiperCard({
  cloned,
  reorder,
  isFront,
  idx,
  currIndex,
  setCurrIndex,
  showNextMovie,
  showPrevMovie,
  poster_path
}) {
  const xTranslate = useMotionValue(0)
  const scale = useTransform(xTranslate, [-150, 0, 150], [0.75, 1, 0.75])
  const rotate = useTransform(xTranslate, [-150, 0, 150], [-40, 0, 40], {
    clamp: false
  })

  function doMath(length, i, factor) {
    return 1 - ((length - i) * factor)
  }

  const variantsFrontCard = {
    initial: {
      x: 5,
    },
    animate: {
      scale: 1,
      opacity: 1
    },
    exit: {
      x: -1500,
      scale: 0.75,
      opacity: 0,
      transition: { duration: 0.2 }
    }
  }

  const variantsBackCard = {
    initial: {
      scale: 0,
      opacity: 0
    },
    animate: i => ({
      scale: doMath(5, i, SCALE_FACTOR),
      opacity: doMath(5, i, 0.15)
    })
  }

  const frontTransition = {
    type: "spring",
    stiffness: 300,
    damping: 20
  }

  const backsTransition = {
    scale: { duration: 0.2 },
    opacity: { duration: 0.4 }
  }

  function handleDragEnd(_, info) {
    if (info.offset.x < -100) {
      showPrevMovie(currIndex - 1)
      const frontIdx = cloned.length - 1
      reorder([
        cloned[frontIdx],
        ...cloned.slice(0, frontIdx)
      ])
    }
    if (info.offset.x > 100) {
      showNextMovie(currIndex + 1)
      reorder([
        ...cloned.slice(1, cloned.length),
        cloned[0]
      ])
    }
  }

  return (
    <motion.div
      className="swiper-card"
      style={{
        x: xTranslate,
        rotate,
        right: idx * RIGHT_X_STEPS,
        marginRight: isFront ? 5 : null
      }}
      drag={isFront ? "x" : false}
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      onDragEnd={handleDragEnd}
      whileTap={{ cursor: "grabbing" }}
      custom={idx}
      variants={isFront ? variantsFrontCard : variantsBackCard}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={isFront ? frontTransition : backsTransition}
    >
      <motion.div className="swiper-card-content" style={{ scale }}>
        <img
          src={`https://image.tmdb.org/t/p/original${poster_path}`}
          draggable="false"
          style={{ userSelect: "none" }}
        />
      </motion.div>
    </motion.div>
  )
}
