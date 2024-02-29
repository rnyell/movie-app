import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect 
} from "react"


export const MovieContext = createContext(null)

export const SearchContext = createContext([])

export const SelectedMovieContext = createContext({})

const initial = {
  results: [],
  currentPage: 1,
  totalPages: 1,
}

function searchReducer(state, action) {
  switch (action.type) {
    case "set_search": {
      return {
        results: state
      }
    }
  }
}


export function MovieProvider({ children }) {
  // const [searchResults, searchDispatch] = useReducer(searchReducer, initial)
  // const [searchResults, setSearchResults] = useState(null) -> cause error why!?
  const [searchResults, setSearchResults] = useState([])
  const [selectedMovie, setSelectedMovie] = useState({})

  return (
    <MovieContext.Provider value={0}>
      <SelectedMovieContext.Provider value={[selectedMovie, setSelectedMovie]}>
        <SearchContext.Provider value={[searchResults, setSearchResults]}>
          {children}
        </SearchContext.Provider>
      </SelectedMovieContext.Provider>
    </MovieContext.Provider>
  )
}


export function useSearch() {
  return useContext(SearchContext)
}

export function useSelectedMovie() {
  return useContext(SelectedMovieContext)
}
