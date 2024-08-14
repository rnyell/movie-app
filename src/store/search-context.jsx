import { createContext, useContext, useReducer } from "react"

const SearchContext = createContext()

export function useSearch() {
  return useContext(SearchContext)
}

const searchInitial = {
  title: "",
  results: [],
  pages: 0,
  error: false
}

function searchReducer(state, action) {
  switch (action.type) {
    case "set_search": {
      return {
        title: action.title,
        results: action.results,
        pages: action.pages,
        error: false
      }
    }
    case "set_error": {
      return {
        ...state,
        error: true
      }
    }
  }
}

const searchOptionsInitial = {
  isFiltered: false,
  isSorted: false,
  filters: {
    type: "all",
    genres: []
  },
  sorts: {
    sortby: "none",
    order: "desc"
  },
}
// possible issue: isFiltered & isSorted won't be false again by dispatch
function searchOptionsRedcuer(state, action) {
  switch (action.type) {
    case "set_type": {
      return {
        ...state,
        isFiltered: true,
        filters: {
          ...state.filters,
          type: action.media
        },
      }
    }
    case "set_genres": {
      return {
        ...state,
        isFiltered: true,
        filters: {
          ...state.filters,
          genres: [...action.ids]
        },
      }
    }
    case "set_sortby": {
      return {
        ...state,
        isSorted: true,
        sorts: {
          ...state.sorts,
          sortby: action.sortby
        }
      }
    }
    case "set_order": {
      return {
        ...state,
        isSorted: true,
        sorts: {
          ...state.sorts,
          order: action.order
        }
      }
    }
  }
}

export default function SearchProvider({children}) {
  const [searchState, searchDispatch] = useReducer(searchReducer, searchInitial)
  const [searchOptions, optionsDispatch] = useReducer(searchOptionsRedcuer, searchOptionsInitial)
  // naming: searchState -> search, searchOptions -> options

  return (
    <SearchContext.Provider
      value={{
        searchState,
        searchDispatch,
        searchOptions,
        optionsDispatch
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}
