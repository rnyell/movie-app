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


export function MovieProvider({ children }) {
  // const [trends, setTrends] = useState([])
  //! const [searchResults, setSearchResults] = useState(null)  cause error why???????????
  const [searchResults, setSearchResults] = useState([])
  const [selectedMovie, setSelectedMovie] = useState({})

  // useEffect(() => {
  //   discoverMovies().then((movies) => setTrends(movies))
  // }, [])

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
