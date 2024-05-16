import { useEffect, useRef, useState } from "react"
import { useSearchParams, useNavigate, useLocation } from "react-router-dom"
import { MagnifyingGlassIcon } from "@heroicons/outline"
import { useClickOutside } from "@utils/hooks"
import { transformTitleToURL } from "@utils/utils"


export default function SearchBox({ dataset }) {
  const [params, setParams] = useSearchParams()
  const [userInput, setUserInput] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const boxRef = useRef(null)
  const inputRef = useRef(null)

  useClickOutside(boxRef, handleClickOutside)

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
    if (title && dataset.includes("default")) {
      navigate("/search")
      setParams({query: title, page: 1})
      return
    } else if (title && dataset.includes("expanded")) {
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
      onKeyDown={keyPressHandler}
      tabIndex={0}
    >
      <div className="icon-wrapper" onClick={handleSearchTitle}>
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
