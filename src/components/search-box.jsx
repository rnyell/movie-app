import { useEffect, useRef, useState } from "react"
import { useSearchParams, useNavigate, useLocation } from "react-router-dom"
import { MagnifyingGlassIcon } from "@heroicons/outline"


export default function SearchBox({ dataLocation }) {
  const [params, setParams] = useSearchParams()
  const [userInput, setUserInput] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const boxRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (params.get("query")) {
      setUserInput(params.get("query"))
    } else {
      setUserInput("")
    }
  }, [location])

  function handleInput({target}) {
    setUserInput(target.value)
  }
  
  function handleSearchMovie(title) {
    if (title && dataLocation.includes("home-page")) {
      navigate("/search")
      setParams({query: title, page: 1})
      return
    } else if (title && dataLocation.includes("results-page")) {
      setParams({query: title, page: 1})
      return
    }
  }

  function handleClick() {
    const formattedInput = userInput
      .trim().toLowerCase()
      .replaceAll("%20", "-");

    if (!formattedInput) {
      return
    } else if (!formattedInput && dataLocation.includes("home-page")) {
      inputRef.current.focus()
      return
    } else if (formattedInput && dataLocation.includes("home-page")) {
      handleSearchMovie(formattedInput)
      return
    }

    handleSearchMovie(formattedInput)
  }

  function handleClickOutside({target}) {
    const element = boxRef.current
    const isOutside = !element.contains(target)
    if (element && isOutside && dataLocation.includes("home-page")) {
      setUserInput("")
    }
  }

  function keyPressHandler(e) {
    if (e.key === "Enter" || e.code === 13) {
      handleClick()
    }
  }

  return (
    <div 
      className="search-box"
      data-location={dataLocation}
      ref={boxRef}
      onKeyDown={keyPressHandler}
      tabIndex={0}
    >
      <div className="icon-wrapper" onClick={handleClick}>
        <i className="icon search-icon">
          <MagnifyingGlassIcon />
        </i>
      </div>
      <label htmlFor="search-input">
        <input
          ref={inputRef}
          onChange={handleInput}
          value={userInput}
          type="text"
          id="search-input"
          className="search-input"
          placeholder="Search . . ."
          spellCheck={true}
        />
      </label>
    </div>
  )
}
