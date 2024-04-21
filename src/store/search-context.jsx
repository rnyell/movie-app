import { createContext, useContext, useReducer } from "react"

const SearchContext = createContext()

export function useSearch() {
  return useContext(SearchContext)
}

const searchInitial = {
  title: "",
  results: [],
  pages: 1,
}

function searchReducer(state, action) {
  switch (action.type) {
    case "set_search": {
      return {
        ...state,
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
        results: [],
        pages: 0,
      }
    }
  }
}

export default function SearchProvider({children}) {
  const [searchState, searchDispatch] = useReducer(searchReducer, searchInitial)

  return (
    <SearchContext.Provider value={[searchState, searchDispatch]}>
      {children}
    </SearchContext.Provider>
  )
}
