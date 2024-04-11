import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/outline"

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

  const itemsA = {
    init: {
      marginLeft: "-4.5cqw",
    },
    anime: {
      marginLeft: "0",
      scale: 1.1,
      transition: { duration: 0.3 }
      // transition: { type: 'spring', velocity: 2 }
    }
  }

  const itemsB = {
    init: {
      opacity: 0.1,
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
      x: -120,
      transition: { duration: 0.25 }
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
            variants={itemsA}
            initial="init"
            animate={isOpen ? "anime" : "init"}
            exit="exit"
          >
            <img className='cast-img' src={`https://image.tmdb.org/t/p/w154/${cast.profile_path}`} draggable="false" />
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
              variants={itemsB}
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
          variants={itemsA}
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