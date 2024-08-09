import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { IMAGES_URL } from "@services"
import { ChevronDoubleRightIcon } from "@heroicons/outline"

import classes from "./casts.module.css"


export default function Casts({
  casts,
  count = 3,
  variant,
  mode,
  withImage = true,
  withHeading = true,
  headingText = "Starring:",
  customStyles = "",
}) {
  const [castsNumber, setCastsNumber] = useState(count)
  const [isOpen, setOpen] = useState(false)

  function showMoreCasts() {
    if (!isOpen) {
      setCastsNumber(6)
      setOpen(true)
    } else {
      setCastsNumber(3)
      setOpen(false)
    }
  }

  const presentItems = {
    initial: {
      marginLeft: "max(-26px, -1.75rem)",
    },
    opened: {
      marginLeft: 0,
      scale: 1.125,
      transition: {
        duration: 0.3
      }
    }
  }

  const floatItems = {
    initial: {
      opacity: 0.1,
      x: -50,
    },
    opened: {
      opacity: 1,
      scale: 1.125,
      x: 0,
      transition: {
        duration: 0.3
      }
    },
    closed: {
      opacity: 0,
      scale: 1,
      x: -90,
      y: 5,
      transition: {
        duration: 0.25
      }
    }
  }

  switch (variant) {
    case "list": {
      return (
        <div
          className={`${classes.casts} ${customStyles}`}
          data-variant={variant}
          data-mode={mode}
        >
          {withHeading && <h4 className={classes.heading}>{headingText}</h4>}
          <ul className={classes.castsList}>
          {casts.slice(0, count).map(cast => (
            <li className={classes.cast} key={cast.name}>
              {withImage && (
                <img
                  className={classes.castImg}
                  src={`${IMAGES_URL}w154/${cast.profile_path}`}
                  draggable={false}
                />
              )}
              <p className={classes.castName}>{cast.name}<i>,</i></p>
            </li>
          ))}
          </ul>
        </div>
      )
    }
    case "drawer": {
      return (
        <div
          className={`${classes.casts} ${customStyles}`}
          data-variant={variant}
          data-state={isOpen ? "open" : "close"}
        >
          {withHeading && <h5 className={classes.heading}>{headingText}</h5>}
          <motion.ul className={classes.castsList}>
            <AnimatePresence>
              {casts.slice(0, count).map(cast => (
                <motion.li
                  className={classes.cast}
                  key={cast.name}
                  variants={presentItems}
                  initial="initial"
                  animate={isOpen ? "opened" : "initial"}
                  exit="closed"
                >
                  <img className={classes.castImg} src={`${IMAGES_URL}w154/${cast.profile_path}`} draggable={false} />
                  <p className={classes.castName}>{cast.name}</p>
                </motion.li>
              ))}
            </AnimatePresence>
            <AnimatePresence mode="popLayout">
              {casts.slice(count, castsNumber).map(cast => (
                castsNumber > 3 && (
                  <motion.li 
                    key={cast.name}
                    className={classes.cast}
                    variants={floatItems}
                    initial="initial"
                    animate="opened"
                    exit="closed"
                  >
                    <img className={classes.castImg} src={`${IMAGES_URL}w154/${cast.profile_path}`} draggable={false} />
                    <p className={classes.castName}>{cast.name}</p>
                  </motion.li>
                )
              ))}
            </AnimatePresence>
            <motion.button
              className="btn"
              onClick={showMoreCasts}
              variants={presentItems}
              initial="initial"
              animate={isOpen ? "opened" : "initial"}
            >
              <motion.i className="icon icon-sm" style={isOpen ? {rotateZ: 180} : {rotateZ: 0}}>
                <ChevronDoubleRightIcon />
              </motion.i>
            </motion.button>
          </motion.ul>
        </div>
      )
    }
  }
}
