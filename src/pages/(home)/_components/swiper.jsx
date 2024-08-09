import { useState } from "react"
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion"
import { IMAGES_URL } from "@services"


const visibleMoviesCount = 5

export default function Swiper({ movies }) {
  const [cloned, reorder] = useState(movies)

  return (
    <div className="swiper-container">
      <div className="swiper">
        <AnimatePresence initial={true} mode="popLayout">
          {cloned.toReversed().slice(-visibleMoviesCount).map((movie, idx) => {
            const isFront = idx === visibleMoviesCount - 1
            return (
              <SwiperCard
                key={movie.id}
                cloned={cloned}
                reorder={reorder}
                isFront={isFront}
                idx={idx}
                poster_path={movie.poster_path}
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
  poster_path
}) {
  const SCALE_FACTOR = 0.05
  const OPACITY_FACTOR = 0.175
  const RIGHT_X_STEPS = 18
  const RIGHT_X_OFFSET = 42
  const xTranslate = useMotionValue(0)
  const scale = useTransform(xTranslate, [-150, 0, 150], [0.75, 1, 0.75])
  const rotate = useTransform(xTranslate, [-150, 0, 150], [-40, 0, 40], {
    clamp: false
  })

  function doSomeMath(i, factor, length) {
    return 1 - ((length - i) * factor)
  }

  const variantsFrontCard = {
    initial: {
      // x: -50,
    },
    animate: {
      x: 0,
      scale: 1,
      opacity: 1
    },
    // exit: {
    //   x: -1500,
    //   scale: 0.75,
    //   opacity: 0,
    //   transition: { duration: 0.2 }
    // }
  }

  const variantsBackCard = {
    initial: {
      scale: 0.5,
      opacity: 0
    },
    animate: i => ({
      x: 3,
      scale: doSomeMath(i, SCALE_FACTOR, visibleMoviesCount),
      opacity: doSomeMath(i, OPACITY_FACTOR, visibleMoviesCount)
    })
  }

  const frontTransition = {
    type: "spring",
    stiffness: 300,
    damping: 20,
    mass: 1.2,
  }

  const backsTransition = {
    scale: {
      duration: 0.2,
    },
    opacity: {
      duration: 0.4,
    }
  }

  function handleDragEnd(_, info) {
    const draggedX = info.offset.x
    const speedX = info.velocity.x
    
    if (draggedX < -100 || speedX < -500) {
      const frontIdx = cloned.length - 1
      reorder([
        cloned[frontIdx],
        ...cloned.slice(0, frontIdx)
      ])
    }
    if (draggedX > 100 || speedX > 500) {
      reorder([
        ...cloned.slice(1, cloned.length),
        cloned[0]
      ])
    }
  }

  return (
    <motion.div
      className={`swiper-card ${isFront ? "front-card" : null}`}
      style={{
        x: xTranslate,
        rotate,
        right: (idx * RIGHT_X_STEPS) - RIGHT_X_OFFSET,
        marginRight: isFront ? 10 : null,
        transformOrigin: "50% 60%",
        cursor: isFront ? "grab" : "auto",
      }}
      drag={isFront ? "x" : false}
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      onDragEnd={handleDragEnd}
      whileTap={{ cursor: "grabbing" }}
      custom={idx}
      variants={isFront ? variantsFrontCard : variantsBackCard}
      initial="initial"
      animate="animate"
      // exit="exit"
      transition={isFront ? frontTransition : backsTransition}
    >
      <motion.div className="swiper-card-content" style={{ scale }}>
        <img
          src={`${IMAGES_URL}original${poster_path}`}
          draggable={false}
          style={{ userSelect: "none" }}
        />
      </motion.div>
    </motion.div>
  )
}

// .swiper-container {
//   grid-column: 1 / 6;
//   grid-row: 1 / 4;
//   padding-block: 1rem;
//   height: 450px;
//   overflow: hidden;
//   & .swiper {
//     width: 100%;
//     height: 100%;
//     position: relative;
//     & .swiper-card {
//       width: min(280px, 75%);
//       position: absolute;
//       top: 0;
//     }
//     & .swiper-card-content {
//       overflow: hidden;
//       border-radius: 3rem;
//     }
//     & .front-card > .swiper-card-content {
//       box-shadow: 0 6px 2rem 2px rgb(64 36 87 / 40%);
//       /* box-shadow: 0 5px 2rem 2px #69172b72; */
//     }
//   }
// }
