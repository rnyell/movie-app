import { extendedFetch } from "./utils"

const BASE_URL = "https://api.themoviedb.org"
const API_KEY = "9f1ffd64abd4bde18614fd9087d87d71"

export const GENRES_IDS = {
  28: "Action",
  12: "Adventure",
  35: "Comedy",
  80: "Crime",
  18: "Drama",
  53: "Thriller",
  14: "Fantasy",
  10751: "Family",
  9648: "Mystery",
  27: "Horror",
  878: "Sci-Fi",
  10749: "Romance",
  10402: "Music",
  36: "History",
  16: "Animation",
  10752: "War",
  37: "Western",
  10770: "TV Movie",
  99: "Documentary",
}

interface MovieSearchResult {
  results: any[];
  totalResults: number;
  totalPages: number;
}


export async function getTrendingMovies() {
  let data = await extendedFetch(BASE_URL, "3/trending/all/day", {
    api_key: API_KEY
  })

  const { results } = data
  console.log(data, results)
  return { results }
}

export async function discoverMovies() {
  // let page = 1
  let data = await extendedFetch(BASE_URL, "3/discover/movie", {
    include_adult: true,
    sort_by: "popularity.desc",
    // page: `${page}`,
    language: "en-US",
    api_key: API_KEY
  })
  const { results } = data
  console.log('discover', results)
  return { results }
}

export async function popularMovies() {
  let data = await extendedFetch(BASE_URL, "3/movie/popular", {
    include_video: true,
    language: "en-US",
    api_key: API_KEY
  })

  console.log(data)
}

export async function searchMovies(title = "", page = 1): Promise<MovieSearchResult> {
  let formattedTitle = title.split(' ').join("+")
  let data = await extendedFetch(BASE_URL, "3/search/movie", {
    query: formattedTitle,
    page: page,
    api_key: API_KEY
  })

  const { 
    results, 
    total_results: totalResults, 
    total_pages: totalPages 
  } = data
  
  return { results, totalResults, totalPages }
}

export async function getMovieDetails(movieId: number) {
  let data = await extendedFetch(BASE_URL, `3/movie/${movieId}`, {
    api_key: API_KEY,
    append_to_response: "credits,videos",
  })

  return data
}

export async function getMovieTrailer(movieId: number): Promise<string> {
  let data = await extendedFetch(BASE_URL, `3/movie/${movieId}/videos`, {
    api_key: API_KEY,
  })

  let officialTrailers = data.results.filter(res => 
    res.type === "Trailer" && 
    res.official === true
  )

  let latestTrailer = officialTrailers[0].key
  let trailerUrl = `https://www.youtube.com/watch?v=${latestTrailer}`
  return trailerUrl
}


/*
`
* Trending is another type of "popularity" score on TMDB but unlike popularity (discussed above), trending's time windows are much shorter (daily, weekly). This helps us surface the relevant content of today (the new stuff) much easier.
`

`
*video: https://api.themoviedb.org/3/movie/{movie_id}?&append_to_response=videos&api_key=API_KEY
`
*/
/*
`${BASE_URL}/search/movie?language=en-US&query=${query}&include_adult=false&year=${currentYear}&page=${currentPage}&api_key=${API_KEY}`
`${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York`
`
  id: 1072790
  imdb_id: "tt26047818"
  original_language: "en"
  original_title: "Anyone But You"
  popularity: 2086.66
  production_companies: Array(7) [ {…}, {…}, {…}, … ]
  production_countries: Array [ {…}, {…} ]
  revenue: 189321912
  spoken_languages: Array [ {…} ]
  tagline: "They only look like the perfect couple."
  video: false
  vote_average: 6.884
  vote_count: 593
`

// const HOME_LIST_TYPE = [
//   {
//     id: 14,
//     title: "Slider",
//     path: "movie/popular?",
//     mode: "slider",
//     type: "movie",
//     page: 1,
//   },
//   {
//     id: 1,
//     title: "Top Rated",
//     path: "movie/top_rated?",
//     mode: "horizontal",
//     type: "movie",
//     page: 1,
//   },
//   {
//     id: 2,
//     title: "Popular",
//     path: "movie/popular?",
//     mode: "vertical",
//     type: "movie",
//     page: 2,
//   },
//   {
//     id: 3,
//     title: "Up Coming",
//     path: "movie/upcoming?",
//     mode: "vertical",
//     type: "movie",
//     page: 1,
//   },
//   {
//     id: 4,
//     title: "Animation",
//     path: "discover/movie?",
//     mode: "vertical",
//     genre: 16,
//     type: "movie",
//     page: 1,
//   },
//   {
//     id: 5,
//     title: "Action",
//     path: "discover/movie?",
//     mode: "vertical",
//     genre: GENRES_ID.action,
//     type: "movie",
//     page: 1,
//   },
//   {
//     id: 6,
//     title: "Romance",
//     path: "discover/movie?",
//     mode: "vertical",
//     genre: GENRES_ID.romance,
//     type: "movie",
//     page: 1,
//   },
//   {
//     id: 7,
//     title: "Fantasy",
//     path: "discover/movie?",
//     mode: "vertical",
//     genre: GENRES_ID.fantasy,
//     type: "movie",
//     page: 1,
//   },
//   {
//     id: 8,
//     title: "War",
//     path: "discover/movie?",
//     mode: "horizontal",
//     genre: GENRES_ID.war,
//     type: "movie",
//     page: 25,
//   },
//   {
//     id: 9,
//     title: "History",
//     path: "discover/movie?",
//     mode: "vertical",
//     genre: GENRES_ID.history,
//     type: "movie",
//     page: 1,
//   },
//   {
//     id: 10,
//     title: "Horror",
//     path: "discover/movie?",
//     mode: "horizontal",
//     genre: GENRES_ID.horror,
//     type: "movie",
//     page: 1,
//   },
//   {
//     id: 11,
//     title: "Spider Man Collection",
//     path: "search/multi?",
//     mode: "vertical",
//     query: "Spider Man",
//     type: "movie",
//     page: 1,
//   },
//   {
//     id: 12,
//     title: "Persian Series",
//     path: "discover/tv?",
//     mode: "vertical",
//     originalLanguage: "fa",
//     type: "tv",
//     page: 1,
//   },
//   {
//     id: 13,
//     title: "Popular Series",
//     path: "discover/tv?sort_by=popularity.desc&",
//     mode: "horizontal",
//     page: 11,
//     type: "tv",
//   },
// ]
*/
