import { useEffect, useState } from "react"
import { useSearchParams, useLocation } from "react-router-dom"
// import { motion, AnimatePresence } from "framer-motion"
import { useWindow } from "@utils/hooks"
import { filterResults, sortResults } from "@utils/utils"
import { getAllResults } from "@utils/apis"
import { useSearch } from "@src/store/search-context"
import Header from "@components/header"
import FilterBox from "@components/search/toolbar/filterbox"
import SearchResults from "@components/search/results/search-results"


export default function SearchPage() {
  const {searchState, searchDispatch, searchOptions} = useSearch()
  const [searchStateCopy, setSearchStateCopy] = useState({results: [], pages: 0})
  const {windowWidth} = useWindow()
  const isLgScreen = windowWidth >= 620
  const [isLoading, setIsLoading] = useState(true)
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const query = searchParams.get("query")
  const isInitialMarkup = query === null

  useEffect(() => {
    if (query) {
      loadResults()
    }
  }, [location])
  
  async function loadResults() {
    setIsLoading(true)
    const title = query
    if (searchState.title !== title) {
      const data = await getAllResults(title)
      searchDispatch({
        type: "set_search",
        title,
        results: data.results,
        pages: data.pages,
      })

      if (searchOptions.isFiltered && searchOptions.isSorted) {
        const {
          filters: {type, genres},
          sorts: {sortby, order}
        } = searchOptions

        const {results: unsortedResults, pages} = filterResults(data.results, type, genres)
        const sortedResults = sortResults(unsortedResults, sortby, order)
        setSearchStateCopy({results: sortedResults, pages})
      }

      if (searchOptions.isFiltered) {
        const selectedType = searchOptions.filters.type
        const selectedGenres = searchOptions.filters.genres
        const {results, pages} = filterResults(data.results, selectedType, selectedGenres)
        setSearchStateCopy({results, pages})
      }

      if (searchOptions.isSorted) {
        const sortby = searchOptions.sorts.sortby
        const order = searchOptions.sorts.order
        const sortedResults = sortResults(data.results, sortby, order)
        setSearchStateCopy({ results: sortedResults, pages: data.pages })
      }

      if (data.totalResults === 0) {
        searchDispatch({ type: "set_error" })
        setIsLoading(false)
        console.error("no results found...")
        throw new Error("not found...")
      }
      
      setSearchStateCopy({
        results: data.results,
        pages: data.pages
      })
    }
    setIsLoading(false)
  }

  return (
    <div className="search-page">
      <Header dataset="sticky expanded" />
      <aside data-screen={isLgScreen ? "lg-screen" : "sm-screen"}>
        <FilterBox searchStateCopy={searchStateCopy} setSearchStateCopy={setSearchStateCopy} />
      </aside>
      <main>
        {isInitialMarkup ? (
          <div>
            some nice animations or ux sentences or pix
          </div>
        ) : (
          <>
            {isLgScreen && (
              <header className="flex-y-center ::after-abs">
                <h2 className="heading">
                  Results for: <span className="searched-title">{query}</span>
                </h2>
                <div className="sort-dropdown-portal"></div>
              </header>
            )}
            <SearchResults isLoading={isLoading} searchStateCopy={searchStateCopy} />
          </>
        )}
      </main>
    </div>
  )
}
