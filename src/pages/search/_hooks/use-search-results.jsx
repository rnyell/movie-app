import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useSearch } from "@src/store"
import { getAllResults } from "@services"
import { filterResults, sortResults } from "../_utils"

const searchStateInitial = { results: [{}], pages: 0 }

export function useSearchResults(query) {
  const {searchState, searchDispatch, searchOptions} = useSearch()
  const [searchResults, setSearchResults] = useState(searchStateInitial)
  const [isLoading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    if (query) {
      loadResults()
    }
  }, [location.search])

  async function loadResults() {
    setLoading(true)

    if (searchState.title !== query) {
      const data = await getAllResults(query)
      searchDispatch({
        type: "set_search",
        title: query,
        results: data.results,
        pages: data.pages,
      })

      if (searchOptions.isFiltered && searchOptions.isSorted) {
        const {type, genres} = searchOptions.filters
        const {sortby, order} = searchOptions.sorts

        const {results: unsortedResults, pages} = filterResults(data.results, type, genres)
        const sortedResults = sortResults(unsortedResults, sortby, order)
        setSearchResults({results: sortedResults, pages})
      }

      if (searchOptions.isFiltered) {
        const selectedType = searchOptions.filters.type
        const selectedGenres = searchOptions.filters.genres
        const {results, pages} = filterResults(data.results, selectedType, selectedGenres)
        setSearchResults({results, pages})
      }

      if (searchOptions.isSorted) {
        const sortby = searchOptions.sorts.sortby
        const order = searchOptions.sorts.order
        const sortedResults = sortResults(data.results, sortby, order)
        setSearchResults({ results: sortedResults, pages: data.pages })
      }

      if (data.pages === 0) {
        searchDispatch({ type: "set_error" })
        setLoading(false)
        console.error("no results found...")
      }
      
      setSearchResults({
        results: data.results,
        pages: data.pages
      })
    }

    setLoading(false)
  }

  return { searchResults, setSearchResults, isLoading }
}
