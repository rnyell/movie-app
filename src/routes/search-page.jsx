import { useEffect, useState } from "react"
import { useSearchParams, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

import { useWindow } from "@utils/hooks"
import { getAllResults } from "@utils/apis"
import { useSearch } from "@src/store/search-context"

import Header from "@components/header"
import FilterBox from "@components/search/toolbar/filterbox"
import SearchResults from "@components/search/results/SearcResults"


export default function SearchPage() {
  const {windowWidth} = useWindow()
  const {searchState, searchDispatch} = useSearch()
  const [searchStateCopy, setSearchStateCopy] = useState({results: [], pages: 0})
  const [isLoading, setIsLoading] = useState(true)
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const query = searchParams.get("query")
  const isInitialMarkup = query === null

  useEffect(() => {
    loadResultsOnMount()
  }, [])

  useEffect(() => {
    if (query) {
      loadResultsOnUpdate()
    }
  }, [location])

  async function loadResultsOnMount() {
    setIsLoading(true)
    let title = query
    const data = await getAllResults(title)
    searchDispatch({
      type: "set_search",
      title,
      results: data.results,
      pages: data.pages,
    })
    setSearchStateCopy({ results: data.results, pages: data.pages })
    setIsLoading(false)
  }

  async function loadResultsOnUpdate() {
    setIsLoading(true)
    let title = query
    if (searchState.title !== title) {
      const data = await getAllResults(title)
      searchDispatch({
        type: "set_search",
        title,
        results: data.results,
        pages: data.pages,
      })
      setSearchStateCopy({ results: data.results, pages: data.pages })

      if (data.totalResults === 0) {
        searchDispatch({ type: "set_error" })
        setIsLoading(false)
        throw new Error("not found...")
      }
    }
    setIsLoading(false)
  }


  return (
    <div className="search-page">
      <Header dataset="sticky expanded" />
      <aside>
        <FilterBox setSearchStateCopy={setSearchStateCopy} />
      </aside>
      <main>
        {isInitialMarkup ? (
          <div>
            <b>todo</b>
            some nice animations initial: search box in appears hear then: after
            clicking on search-icon, it moves to header, or first morphs to a
            spinner ...
          </div>
        ) : (
          <>
            {windowWidth >= 620 && (
            <h2 className="heading">
              Results for: <span>{query}</span>
            </h2>)}
            <SearchResults isLoading={isLoading} searchStateCopy={searchStateCopy} />
          </>
        )}
      </main>
    </div>
  )
}
