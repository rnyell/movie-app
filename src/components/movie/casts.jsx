import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons"

export default function Casts({ casts }) {
  let initialCastsNumber = 4
  const [castsNumber, setCastsNumber] = useState(initialCastsNumber)
  const [isOpen, setIsOpen] = useState(false)

  function showMoreCasts() {
    if (!isOpen) {
      setCastsNumber(7)
      setIsOpen(true)
    } else {
      setCastsNumber(4)
      setIsOpen(false)
    }
  }

  const variants_1 = {
    init: {
      marginLeft: "-1.5rem",
      transition: { duration: 0.35 }
    },
    anime: {
      marginLeft: "0",
      scale: 1.1,
      transition: { duration: 0.35 }
      // transition: { type: 'spring', velocity: 2 }
    }
  }

  const variants_2 = {
    init: {
      opacity: 0,
      x: -50,
    },
    anime: {
      opacity: 1,
      scale: 1.1,
      x: 0,
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      scale: 1,
      x: -75,
      transition: { duration: 0.2 }
    }
  }

  return (
    <div className='casts'>
      <h5>Casts</h5>
      <motion.ul className={`casts-list cast ${castsNumber !== 4 ? "show-more" : ""}`}>
        <AnimatePresence>
          {casts.slice(0, 4).map((cast, i) =>
          <motion.li 
            className="cast"
            key={i}
            variants={variants_1}
            initial="init"
            animate={isOpen ? "anime" : "init"}
            exit="exit"
          >
            <img className='cast-img' src={`https://image.tmdb.org/t/p/w154/${cast.profile_path}`} />
            <p className="cast-name">{cast.name}</p>
          </motion.li>
          )}
        </AnimatePresence>
        <AnimatePresence mode="popLayout">
          {casts.slice(initialCastsNumber, castsNumber).map((cast, i) => 
            castsNumber > 4 && 
            <motion.li 
              key={i}
              className="cast"
              variants={variants_2}
              initial="init"
              animate="anime"
              exit="exit"
            >
              <img className='cast-img' src={`https://image.tmdb.org/t/p/w154/${cast.profile_path}`} />
              <p className="cast-name">{cast.name}</p>
            </motion.li>
          )}
        </AnimatePresence>
        <motion.button 
          onClick={showMoreCasts}
          variants={variants_1}
          initial="init"
          animate={isOpen ? "anime" : "init"}
        >
          <i className="icon">
            {isOpen ? <ChevronDoubleLeftIcon /> : <ChevronDoubleRightIcon />}
          </i>
          {/* {isOpen ? <span>&#xab;</span> : <span>&#xbb;</span>} */}
        </motion.button>
      </motion.ul>
    </div>
  )
}