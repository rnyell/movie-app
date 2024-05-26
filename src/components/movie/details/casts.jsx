import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/outline"
import { IMAGES_URL } from "@utils/apis"


export default function Casts({ casts, mode }) {
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
    initial: {
      marginLeft: "-4.5cqw",
    },
    opened: {
      marginLeft: "0",
      scale: 1.1,
      transition: {
        duration: 0.3
      }
    }
  }

  const itemsB = {
    initial: {
      opacity: 0.1,
      x: -50,
    },
    opened: {
      opacity: 1,
      scale: 1.1,
      x: 0,
      transition: {
        duration: 0.3
      }
    },
    closed: {
      opacity: 0,
      scale: 1,
      x: -120,
      transition: {
        duration: 0.25
      }
    }
  }

  switch (mode) {
    case "names": {
      return (
        <div className="casts align-center flex-wrap" data-mode={mode}>
          <h6 className="heading">Starring:</h6>
          {casts.slice(0, 4).map(c =>
            <p key={c.name} className="cast-name">{c.name}<span>,</span></p>
          )}
        </div>
      )
    }
    case "list": {
      return (
        <div className="casts" data-mode={mode}>
          <h4 className="heading">Casts</h4>
          <ul className="casts-list">
          {casts.slice(0, 8).map((cast, i) =>
            <li className="cast align-center-col" key={i}>
              <img
                className="cast-img unselectable"
                src={`${IMAGES_URL}w154/${cast.profile_path}`}
                draggable={false}
              />
              <p className="cast-name">{cast.name}</p>
            </li>
          )}
          </ul>
        </div>
      )
    }
    case "drawer": {
      return (
        <div className="casts" data-mode={mode}>
          <h5 className="heading">Casts</h5>
          <motion.ul className={`casts-list ${castsNumber !== 4 ? "show-more" : ""}`}>
            <AnimatePresence>
              {casts.slice(0, 4).map((cast, i) =>
              <motion.li
                className="cast align-center-col"
                key={i}
                variants={itemsA}
                initial="initial"
                animate={isOpen ? "opened" : "initial"}
                exit="closed"
              >
                <img
                  className="cast-img unselectable"
                  src={`${IMAGES_URL}w154/${cast.profile_path}`}
                  draggable={false}
                />
                <p className="cast-name">{cast.name}</p>
              </motion.li>
              )}
            </AnimatePresence>
            <AnimatePresence mode="popLayout">
              {casts.slice(initialCastsNumber, castsNumber).map((cast, i) => 
                castsNumber > 4 && (
                  <motion.li 
                    key={i}
                    className="cast"
                    variants={itemsB}
                    initial="initial"
                    animate="opened"
                    exit="closed"
                  >
                    <img
                      className="cast-img unselectable"
                      src={`${IMAGES_URL}w154/${cast.profile_path}`}
                      draggable={false}
                    />
                    <p className="cast-name">{cast.name}</p>
                  </motion.li>
                )
              )}
            </AnimatePresence>
            <motion.button
              className="btn"
              onClick={showMoreCasts}
              variants={itemsA}
              initial="initial"
              animate={isOpen ? "opened" : "initial"}
            >
              <i className="icon">
                {isOpen ? <ChevronDoubleLeftIcon /> : <ChevronDoubleRightIcon />}
              </i>
            </motion.button>
          </motion.ul>
        </div>
      )

    }
  }
}
