import { createContext, useContext, useReducer, useState } from "react"

const SearchContext = createContext()

export function useSearch() {
  return useContext(SearchContext)
}

const searchInitial = {
  title: "",
  results: [],
  pages: 0,
}

function searchReducer(state, action) {
  switch (action.type) {
    case "set_search": {
      return {
        title: action.title,
        results: action.results,
        pages: action.pages,
      }
    }
    case "page_changed": {
      return {
        ...state,
        results: action.results,
      }
    }
    case "set_error": {
      return {
        title: "",
        results: [],
        pages: 0,
      }
    }
  }
}

const searchOptionsInitial = {
  filters: {
    type: "all",
    genres: []
  },
  sorts: {
    sortby: null,
    order: "desc"
  }
}

function searchOptionsRedcuer(state, action) {
  switch (action.type) {
    case "set_type": {
      return {
        ...state,
        filters: {
          ...state.filters,
          type: action.media
        }
      }
    }
    case "set_genres": {
      var filteredGenres  // using `var` to honor years of honset servicing to humankind...
      const currentGenres = state.filters.genres
      if (currentGenres.includes(action.id)) {
        filteredGenres = currentGenres.filter(el => el !== action.id)
      } else {
        filteredGenres = [...new Set( [...currentGenres, action.id] )]
      }
      return {
        ...state,
        filters: {
          ...state.filters,
          genres: filteredGenres
        }
      }
    }
    case "set_sortby": {

    }
    case "set_order": {

    }
  }
}

export default function SearchProvider({children}) {
  const [searchState, searchDispatch] = useReducer(searchReducer, searchInitial)
  const [searchOptions, optionsDispatch] = useReducer(searchOptionsRedcuer, searchOptionsInitial)
  // naming: searchState -> search, searchOptions -> options

  return (
    <SearchContext.Provider value={{
      searchState,
      searchDispatch,
      searchOptions,
      optionsDispatch
    }}>
      {children}
    </SearchContext.Provider>
  )
}
