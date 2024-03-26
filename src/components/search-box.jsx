import { useEffect, useRef, useState } from "react"
import { useSearchParams, useNavigate, useLocation } from "react-router-dom"
import { MagnifyingGlassIcon } from "@heroicons/outline"

import "@styles/search-box.css"


export default function SearchBox({ isHomePage }) {
  const [params, setParams] = useSearchParams()
  const [userInput, setUserInput] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const [isExpanded, setIsExpanded] = useState(isHomePage ? false : true)
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
    if (isHomePage && title) {
      navigate("/search")
      setParams({query: title, page: 1})
      return
    } else if (!isHomePage && title) {
      setParams({query: title, page: 1})
      return
    }
  }

  function handleClick() {
    const formattedInput = userInput
      .trim().toLowerCase()
      .replaceAll("%20", "-");

    if (isExpanded && !formattedInput) {
      return
    } else if (isHomePage && !formattedInput) {
      setIsExpanded(!isExpanded)
      inputRef.current.focus()
      return
    } else if (isHomePage && formattedInput) {
      handleSearchMovie(formattedInput)
      return
    }

    handleSearchMovie(formattedInput)
  }

  function handleClickOutside({target}) {
    if (
      boxRef.current && 
      !boxRef.current.contains(target) && 
      isHomePage
    ) {
      setUserInput("")
      setIsExpanded(false)
    }
  }

  function keyPressHandler(e) {
    if (e.key === "Enter" || e.code === 13) {
      handleClick()
    }
  }

  return (
    <div 
      // className={`search-box ${isExpanded ? "expanded" : ""}`} 
      className="search-box"
      data-location={isHomePage ? "on-home-page" : "on-result-page"}
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
