import { useEffect, useRef, useState } from "react"
import { useSearchParams, useNavigate, useLocation } from "react-router-dom"
import { MagnifyingGlassIcon } from "@heroicons/outline"
import { useClickOutside } from "@lib/hooks"
import { transformTitleToURL } from "@lib/utils"


export default function SearchBox({ variant }) {
  const boxRef = useRef(null)
  const inputRef = useRef(null)
  const [userInput, setUserInput] = useState("")
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()

  useClickOutside(boxRef, handleClickOutside)

  useEffect(() => {
    if (searchParams.get("query")) {
      setUserInput(searchParams.get("query").replaceAll("-", " "))
    } else {
      setUserInput("")
    }
  }, [location.search])

  function handleInput({target}) {
    setUserInput(target.value)
  }
  
  function handleSearchMovie(title) {
    if (title && variant === "default") {
      navigate("/search")
      setSearchParams({query: title, page: 1})
      return
    } else if (title && variant === "stretched") {
      setSearchParams({query: title, page: 1})
      return
    } else if (title && variant === "animated") {
      setSearchParams({query: title, page: 1})
      return
    }
  }

  function handleSearchTitle() {
    const formattedInput = transformTitleToURL(userInput)

    if (!formattedInput) {
      return
    } else if (!formattedInput && variant === "default") {
      inputRef.current.focus()
      return
    } else if (formattedInput && variant === "default") {
      handleSearchMovie(formattedInput)
      return
    }

    handleSearchMovie(formattedInput)
  }

  function handleClickOutside({target}) {
    const element = boxRef.current
    const isOutside = !element.contains(target)
    if (element && isOutside && variant === "default") {
      setUserInput("")
    }
  }

  function keyPressHandler(e) {
    if (e.key === "Enter" || e.code === 13) {
      handleSearchTitle()
    }
  }

  return (
    <div 
      className="search-box"
      data-variant={variant}
      ref={boxRef}
      tabIndex={0}
      onKeyDown={keyPressHandler}
    >
      <div className="icon-wrapper" onClick={handleSearchTitle}>
        <i className="icon search-icon">
          <MagnifyingGlassIcon />
        </i>
      </div>
      <label htmlFor="search-input">
        <input
          id="search-input"
          className="search-input"
          type="text"
          ref={inputRef}
          spellCheck={true}
          placeholder="Search . . ."
          value={userInput}
          onChange={handleInput}
        />
      </label>
    </div>
  )
}
