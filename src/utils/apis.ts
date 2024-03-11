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

//// 3/search/movie?include_adult=false&language=en-US&page=1
// ~'/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'
// ~'3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'

/*
~ 3/search/multi
https://developer.themoviedb.org/reference/search-multi
+Use multi search when you want to search for movies, TV shows and people in a single request.
filter results by:
   "media_type === movie || tv"
   original_language
ret value: { results[], total_pages: number, total_results: number }
*/

// movie details -> images
//~ /3/movie/{movie_id}/similar
//* 3/movie/{movie_id}/images  //--> append to response --> getMovieDetails()

export async function getPopularMovies() {
  let data = await extendedFetch(BASE_URL, "3/movie/popular", {
    page: 1,
    language: "en-US",
    api_key: API_KEY
  })

  const { results } = data
  return results
}


export async function test() {
  let data = await extendedFetch(BASE_URL, "3/search/multi", {
    query: "office",
    api_key: API_KEY
  })

  console.log(data);
}


export async function getSearchedMovies(
  title = "",
  page = 1,
  // lang = "en-US"
): Promise<MovieSearchResult> {
  let formattedTitle = title.split(' ').join("+")
  let data = await extendedFetch(BASE_URL, "3/search/movie", {
    query: formattedTitle,
    page: page,
    // language: lang,
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
    append_to_response: "credits,videos,images",
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
`
series genres
id: 10759, name: "Action & Adventure"
id: 16, name: "Animation"
id: 35, name: "Comedy"
id: 80, name: "Crime"
id: 99, name: "Documentary"
id: 18, name: "Drama"
id: 10751, name: "Family"
id: 10762, name: "Kids"
id: 9648, name: "Mystery"
id: 10763, name: "News"
id: 10764, name: "Reality"
id: 10765, name: "Sci-Fi & Fantasy"
id: 10766, name: "Soap"
id: 10767, name: "Talk"
id: 10768, name: "War & Politics"
id: 37, name: "Western" }
`

`
movies genres
id: 28, name: "Action"
id: 12, name: "Adventure"
id: 16, name: "Animation"
id: 35, name: "Comedy"
id: 80, name: "Crime"
id: 99, name: "Documentary"
id: 18, name: "Drama"
id: 10751, name: "Family"
id: 14, name: "Fantasy"
id: 36, name: "History"
id: 27, name: "Horror"
id: 10402, name: "Music"
id: 9648, name: "Mystery"
id: 10749, name: "Romance"
id: 878, name: "Science Fiction"
id: 10770, name: "TV Movie"
id: 53, name: "Thriller"
id: 10752, name: "War"
id: 37, name: "Western" 
`
*/
