import { useReducer, useRef } from "react"
import { ArrowUpRightIcon } from "@heroicons/outline"
import { useMoviesState } from "@src/store/app-context"
import MovieCard from "@components/movie/movie-card"

const initialPosition = { 
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


export default function ScreenMovies() {
  const [moviesState] = useMoviesState()
  const [pointer, dispatch] = useReducer(reducer, initialPosition)
  const pageRef = useRef(null)
  const containerRef = useRef(null)
  const cursorRef = useRef(null)

  const styles = {
    "--scale": pointer.scale,
    "--opacity": pointer.opacity
  }

  function handlePointerMove(event) {
    const { clientX, clientY } = event
    let x = (clientX - cursorRef.current.offsetWidth / 2)
    let y = (clientY - cursorRef.current.offsetHeight / 2)
    let transition = { duration: 150, fill: "forwards" }
    let frames = {
      translate: `${pointer.x}px ${pointer.y}px`,
      scale: pointer.scale
    }

    if (!event.target.closest(".movie-card figure")) {
      dispatch({ type: "move", x, y })
      cursorRef.current.animate(frames, transition)
    } else {
      dispatch({ type: "hover", x, y })
      cursorRef.current.animate(frames, transition)
    }
  }

  function handlePointerEnter() {
    containerRef.current.style.willChange = "transform"
    dispatch({type: "enter"})
  }

  function handlePointerLeave() {
    containerRef.current.style.willChange = "auto"
    dispatch({type: "leave"})
  }


  return (
    <div
      className="page screen-movies"
      ref={pageRef}
      // style={styles}
      // onMouseEnter={handlePointerEnter}
      // onPointerMove={handlePointerMove}
      // onMouseLeave={handlePointerLeave}
    >
      <section>
        <header className="page-header">
          <h2>Currently In Cinema</h2>
          <p>Grab Your Popcorn!🍿</p>
        </header>
        <div className="movies-container" ref={containerRef}>
          {moviesState.screen.map((movie, idx) => (
            <MovieCard
              key={movie.id}
              result={movie}
              idx={idx}
              media="movie"
              variant="screen"
            />
          ))}
        </div>
      </section>
      <div ref={cursorRef} className="pointer">
        <div className={`${pointer.hover ? "is-hover" : ""}`}>
          <ArrowUpRightIcon /><span>Buy Ticket</span>
        </div>
      </div>
    </div>
  )
}
