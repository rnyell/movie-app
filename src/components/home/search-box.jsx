import { useEffect, useRef, useState } from "react"
import { useSearchParams, useNavigate, useLocation } from "react-router-dom"

import { searchMovies } from "../../utils/apis"
import { useSearch } from "../../store/app-context"

import "../styles/searchbox.css"


export default function SearchBox({ onHomePage }) {
  const [searchResults, setSearchResults] = useSearch()
  const [params, setParams] = useSearchParams()
  const [userInput, setUserInput] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const [isExpanded, setIsExpanded] = useState(onHomePage ? false : true)
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
    //* TODO: add debouncing
    setUserInput(target.value)
  }
  
  function handleSearchMovie(title) {
    if (onHomePage) {
      navigate("/search")
    }

    if (title) {
      setParams({query: title})
    } else {
      setParams({query: ""})
    }
    
    searchMovies(userInput).then(data => setSearchResults(data.results))
    //? how to listen to `Enter` key?
  }

  function handleClick() {
    const formattedInput = userInput
      .trim().toLowerCase()
      .replaceAll("%20", "-");

    if (isExpanded && !formattedInput) {
      return
    } else if (onHomePage && !formattedInput) {
      setIsExpanded(!isExpanded)
      inputRef.current.focus()
      return
    } else if (onHomePage && formattedInput) {
      handleSearchMovie(formattedInput)
      return
    }

    handleSearchMovie(formattedInput)
  }

  function handleClickOutside({target}) {
    if (
      boxRef.current && 
      !boxRef.current.contains(target) && 
      onHomePage
    ) {
      setUserInput("")
      setIsExpanded(false)
    }
  }


  return (
    <div 
      className={`search-box ${isExpanded ? "expanded" : ""}`} 
      data-location={onHomePage ? "on-home-page" : "on-result-page"}
      ref={boxRef}
    >
      <div className="icon-wrapper" onClick={handleClick}>
        <i className="search-icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </i>
      </div>
      <label htmlFor="search-input">
        <input
          type="text"
          id="search-input"
          className="search-input"
          ref={inputRef}
          value={userInput}
          onChange={handleInput}
        />
      </label>
    </div>
  )
}
