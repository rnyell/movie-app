import { useEffect, useRef, useState } from "react"
import { useSearchParams, useNavigate, useLocation } from "react-router-dom"
import { MagnifyingGlassIcon } from "@heroicons/outline"
import { useClickOutside } from "@utils/hooks"
import { transformTitleToURL } from "@utils/utils"


export default function SearchBox({ dataset }) {
  const [userInput, setUserInput] = useState("")
  const inputRef = useRef(null)
  const boxRef = useRef(null)
  const [params, setParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()

  useClickOutside(boxRef, handleClickOutside)

  useEffect(() => {
    if (params.get("query")) {
      setUserInput(params.get("query").replaceAll("-", " "))
    } else {
      setUserInput("")
    }
  }, [location])

  function handleInput({target}) {
    setUserInput(target.value)
  }
  
  function handleSearchMovie(title) {
    if (title && dataset.includes("default")) {
      navigate("/search")
      setParams({query: title, page: 1})
      return
    } else if (title && dataset.includes("stretched")) {
      setParams({query: title, page: 1})
      return
    } else if (title && dataset.includes("animated")) {
      setParams({query: title, page: 1})
      return
    }
  }

  function handleSearchTitle() {
    const formattedInput = transformTitleToURL(userInput)

    if (!formattedInput) {
      return
    } else if (!formattedInput && dataset.includes("default")) {
      inputRef.current.focus()
      return
    } else if (formattedInput && dataset.includes("default")) {
      handleSearchMovie(formattedInput)
      return
    }

    handleSearchMovie(formattedInput)
  }

  function handleClickOutside({target}) {
    const element = boxRef.current
    const isOutside = !element.contains(target)
    if (element && isOutside && dataset.includes("default")) {
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
      data-set={dataset}
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
