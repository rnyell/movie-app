import { useEffect, useReducer, useRef, useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRightIcon } from "@heroicons"

import { useAppState } from "@src/store/app-context"
import MovieCard from "./movie-card"


const init = { 
  x: 0,
  y: 0,
  scale: 1,
  opacity: 0,
  hover: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case "enter": {
      return {
        ...state,
        opacity: 1
      }
    }
    case "move": {
      return {
        ...state,
        x: action.x,
        y: action.y,
        scale: 1,
        hover: false,
      }
    }
    case "hover": {
      return {
        ...state,
        hover: true,
        x: action.x,
        y: action.y,
        scale: 5
      }
    }
    case "leave": {
      return {
        ...state,
        opacity: 0,
        scale: 1
      }
    }
  }
}

export default function ScreenSection() {
  const [appState] = useAppState()
  const [pointer, dispatch] = useReducer(reducer, init)
  const [constrainsWidth, setConstrainsWidth] = useState(400)
  const sectionRef = useRef(null)
  const wrapRef = useRef(null)
  const cursorRef = useRef(null)

  useEffect(() => {
    let offset = 30
    setConstrainsWidth(wrapRef.current.scrollWidth - window.innerWidth + offset)
  }, [constrainsWidth])
  
  const styles = {
    "--scale": pointer.scale,
    "--opacity": pointer.opacity,
  }

  function handlePointerMove(event) {
    const { clientX, clientY } = event
    const { top, left } = sectionRef.current.getBoundingClientRect()
    let scrolledFromLeft = wrapRef.current.scrollLeft
    // this "cursorRef.current.offsetWidth / 2" is for matching the center of the circle to noke-peikan-e cursor
    let x = (clientX - cursorRef.current.offsetWidth / 2) - left + scrolledFromLeft
    let y = (clientY - cursorRef.current.offsetHeight / 2) - top
    let frames = {
      translate: `${pointer.x}px ${pointer.y}px`,
      scale: pointer.scale
    }
    let transition = { duration: 150, fill: "forwards" }

    if (!event.target.closest(".movie-card")) {
      dispatch({ type: "move", x, y })
      cursorRef.current.animate(frames, transition)
    } else {
      dispatch({ type: "hover", x, y })
      cursorRef.current.animate(frames, transition)
    }
  }

  function handleEntering() {
    wrapRef.current.style.willChange = "transform"
    dispatch({type: "enter"})
  }

  function handleLeaving() {
    wrapRef.current.style.willChange = "auto"
    dispatch({type: "leave"})
  }
  

  return (
    <section
      ref={sectionRef} 
      style={styles}
      onMouseEnter={handleEntering}
      onPointerMove={handlePointerMove}
      onMouseLeave={handleLeaving}
      className="screen-section"
    >
      <h3 className="heading">On Screen Movies</h3>
      <p>Reserve some tickets!</p>
      <motion.div
        ref={wrapRef}
        drag="x"
        dragConstraints={{ left: -constrainsWidth, right: 0 }}
        className="screen-movies-wrapper" 
      >
        {appState.screen.slice(10).map(movie => <MovieCard result={movie} type="screen" />)}
      </motion.div>
      <div ref={cursorRef} className="pointer">
        <div className={`${pointer.hover ? "is-hover" : ""}`}>
          <ArrowUpRightIcon />
          <span>Buy Ticket</span>
        </div>
      </div>
    </section>
  )
}
