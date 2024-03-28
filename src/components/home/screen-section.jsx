import { useEffect, useReducer, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { motion, useScroll, animate, useInView, useTransform, useMotionValueEvent } from "framer-motion"
import { ArrowUpRightIcon, ChevronRightIcon } from "@heroicons/outline"

import { useAppState } from "@src/store/app-context"
import MovieCard from "@components/movie/movie-card"


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
        scale: 4
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
  const draggableRef = useRef(null)
  const cursorRef = useRef(null)

  
  useEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [constrainsWidth])

  function handleResize() {
    let offset = 85
    setConstrainsWidth(
      draggableRef.current.scrollWidth - window.innerWidth + offset
    )
  }
  
  const styles = {
    "--scale": pointer.scale,
    "--opacity": pointer.opacity
  }

  function handlePointerMove(event) {
    const { clientX, clientY } = event
    const { top, left } = sectionRef.current.getBoundingClientRect()
    let scrolledFromLeft = draggableRef.current.scrollLeft
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

  function handlePointerEnter() {
    draggableRef.current.style.willChange = "transform"
    dispatch({type: "enter"})
  }

  function handlePointerLeave() {
    draggableRef.current.style.willChange = "auto"
    dispatch({type: "leave"})
  }
  

  return (
    <section
      ref={sectionRef}
      style={styles}
      // style={{ opacity: scrollYProgress }}
      // onMouseEnter={handlePointerEnter}
      // onPointerMove={handlePointerMove}
      // onMouseLeave={handlePointerLeave}
      className="screen-section"
    >
      <header>
        <div>
          <h3 className="heading">Now Playing</h3>
          <Link to="/">Explore more<ChevronRightIcon /></Link>
        </div>
        <p>Grab Your Popcorn!🍿</p>
      </header>
      <div className="screen-movies-wrapper">
        <motion.div
          ref={draggableRef}
          drag="x"
          dragConstraints={{ left: -constrainsWidth, right: 0 }}
          className="draggable"
        >
          {appState.screen.slice(0, 10).map(movie => <MovieCard key={movie.id} result={movie} type="screen" />)}
        </motion.div>
      </div>
      <div ref={cursorRef} className="pointer">
        <div className={`${pointer.hover ? "is-hover" : ""}`}>
          <ArrowUpRightIcon /><span>Buy Ticket</span>
        </div>
      </div>
    </section>
  )
}
