import { useReducer, useRef } from "react"
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
  const wrapRef = useRef(null)
  const cursorRef = useRef(null)
  
  const styles = {
    "--scale": pointer.scale,
    "--opacity": pointer.opacity
  }

  function handlePointerMove(event) {
    const { clientX, clientY } = event
    const { top, left } = wrapRef.current.getBoundingClientRect()
    let scrolledFromLeft = wrapRef.current.scrollLeft
    let x = (clientX - cursorRef.current.offsetWidth / 2) - left + scrolledFromLeft
    let y = (clientY - cursorRef.current.offsetHeight / 2) - top
    let frames = {
      translate: `${pointer.x}px ${pointer.y}px`,
      scale: pointer.scale
    }

    if (event.target === wrapRef.current) {
      dispatch({ type: "move", x, y })
      cursorRef.current.animate(frames, {
        duration: 150,
        fill: "forwards"
      })
    } else {
      dispatch({ type: "hover", x, y })
      cursorRef.current.animate(frames, {
        duration: 150,
        fill: "forwards"
      })
    }
  }

  function handleEntering() {
    dispatch({type: "enter"})
  }

  function handleLeaving() {
    dispatch({type: "leave"})
  }
  

  return (
    <section className="screen-section">
      <h3 className="heading">On Screen Movies</h3>
      <p>Reserve some tickets!</p>
      <div
        className="screen-movies-container" 
        style={styles}
        ref={wrapRef}
        onMouseEnter={handleEntering}
        onPointerMove={handlePointerMove}
        onMouseLeave={handleLeaving}
      >
        <div className="pointer" ref={cursorRef}>
          {
           <div className={`${pointer.hover ? "is-hover" : ""}`}>
            <ArrowUpRightIcon />
            <span>Buy Ticket</span>
          </div>
          }
        </div>
        {appState.screen.slice(10).map(movie => <MovieCard result={movie} type="screen" />)}
      </div>
    </section>
  )
}
