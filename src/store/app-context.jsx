import {
  createContext,
  useContext,
  useReducer,
  useState,
} from "react"


export const MovieContext = createContext(null)

export const SearchContext = createContext([])

export const SelectedMovieContext = createContext({})


export function useSearch() {
  return useContext(SearchContext)
}

export function useSelectedMovie() {
  return useContext(SelectedMovieContext)
}


const initial = {
  results: [],
  currentPage: 1,
  totalPages: 1,
}

function searchReducer(state, action) {
  switch (action.type) {
    case "set_search": {
      return {
        ...state,
        results: action.results,
        totalPages: action.totalPages
      }
    }
    case "page_changed": {
      return {
        ...state,
        results: action.results,
        currentPage: action.currentPage,
      }
    }
    case "set_error": {
      return {
        results: [],
        currentPage: 0,
        totalPages: 0
      }
    }
  }
}

export function MovieProvider({ children }) {
  const [searchState, searchDispatch] = useReducer(searchReducer, initial)
  // const [searchResults, setSearchResults] = useState(null) -> cause error why!?
  // const [searchResults, setSearchResults] = useState([])
  const [selectedMovie, setSelectedMovie] = useState({})

  return (
    <MovieContext.Provider value={0}>
      <SelectedMovieContext.Provider value={[selectedMovie, setSelectedMovie]}>
        <SearchContext.Provider value={[searchState, searchDispatch]}>
          {children}
        </SearchContext.Provider>
      </SelectedMovieContext.Provider>
    </MovieContext.Provider>
  )
}
