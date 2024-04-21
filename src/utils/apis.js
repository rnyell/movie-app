import { request } from "./utils"


export const ALL_GENRES = {
  18: "Drama",
  53: "Thriller",
  28: "Action",
  35: "Comedy",
  16: "Animation",
  80: "Crime",
  12: "Adventure",
  14: "Fantasy",
  10751: "Family",
  9648: "Mystery",
  27: "Horror",
  878: "Sci-Fi",
  10749: "Romance",
  10402: "Music",
  10759: "Action & Adventure",
  10765: "Sci-Fi & Fantasy",
  10767: "Talk",
  10768: "War & Politics",
  37: "Western",
  99: "Documentary",
  36: "History",
  10752: "War",
  10770: "TV Movie",
}

export const MOVIE_GENRES = {
  18: "Drama",
  53: "Thriller",
  28: "Action",
  35: "Comedy",
  16: "Animation",
  80: "Crime",
  12: "Adventure",
  14: "Fantasy",
  10751: "Family",
  9648: "Mystery",
  27: "Horror",
  878: "Sci-Fi",
  10749: "Romance",
  10402: "Music",
  36: "History",
  10752: "War",
  10770: "TV Movie",
  99: "Documentary",
  37: "Western",
}

export const TV_GENRES = {
  18: "Drama",
  10751: "Family",
  10759: "Action & Adventure",
  10765: "Sci-Fi & Fantasy",
  35: "Comedy",
  80: "Crime",
  9648: "Mystery",
  10767: "Talk",
  16: "Animation",
  10768: "War & Politics",
  37: "Western",
  99: "Documentary",
  /* 10762: "Kids",*/
  /* 10763: "News",*/
  /* 10764: "Reality",*/
  /* 10766: "Soap",*/
}

export const displayedMovieGenres = [
  { name: "Drama", id: 18 },
  { name: "Thrillers", id: 53 },
  { name: "Action", id: 28 },
  { name: "Crime", id: 80 },
  { name: "Sci-Fi", id: 878 },
  { name: "Comedy", id: 35 },
  { name: "Romance", id: 10749 },
  { name: "Musical", id: 10402 },
  { name: "Animation", id: 16 },
]

export const seriesDisplayedGenres = [
  { name: "Drama", id: 18 },
  { name: "Action, Adveture", id: 10759 },
  { name: "Sci-Fi, Fantasy", id: 10765 },
  { name: "Comedy", id: 35 },
  { name: "Mystery", id: 9648 },
  { name: "Crime", id: 80 },
]

export const filterGenres = [
  { name: "Drama", id: 18 },
  { name: "Comedy", id: 35 },
  { name: "Crime", id: 80 },
  { name: "Mystery", id: 9648 },
  { name: "Thrillers", id: 53 },
  { name: "Family", id: 10751},
  { name: "Romance", id: 10749 },
  { name: "Musical", id: 10402 },
  { name: "Animation", id: 16 },
  { name: "Horror", id: 27 },
  { name: "Sci-Fi", id: 878 },
  // { name: "Sci-Fi, Fantasy", id: 10765 },
  { name: "Fantasy", id: 10765 },
  { name: "Action", id: 28 },
  // { name: "Action, Adveture", id: 10759 },
  { name: "Adveture", id: 10759 },
]

//+ series
//+ https://developer.themoviedb.org/reference/tv-series-on-the-air-list
//+ https://api.themoviedb.org/3/tv/{series_id}

export async function getComingMovies() {
  const path = "3/movie/upcoming"
  const params = {
    page: 1,
    language: "en-US",
    api_key: import.meta.env.VITE_MAIN_API_KEY
  }
  let data = await request(path, params)
  const { results } = data
  return results
}


export async function getOnScreenMovies() {
  const path = "3/movie/now_playing"
  const params = {
    page: 1,
    language: "en-US",
    region: "US",
    api_key: import.meta.env.VITE_MAIN_API_KEY
  }
  let data = await request(path, params)
  const { results } = data
  return results
}


export async function getPopularMovies() {
  //+ '/3/discover/movie?include_video=false&sort_by=popularity.desc'
  const path = "3/movie/popular"
  const params = {
    page: 1,
    language: "en-US",
    include_adult: false,
    api_key: import.meta.env.VITE_MAIN_API_KEY
  }
  let data = await request(path, params)
  const { results } = data
  return results
}

export async function getTrendingSeries() {
  // const path = "3/trending/tv/week"
  const path = "3/discover/tv"
  const params = {
    page: 1,
    language: "en-US",
    region: "US",
    include_adult: false,
    include_video: false,
    sort_by: "popularity.desc",
    "vote_count.gte": 200,
    include_null_first_air_dates: false,
    without_genres: "99,10762,10763,10764,10766,10767",
    api_key: import.meta.env.VITE_MAIN_API_KEY
  }
  let data = await request(path, params)
  const { results } = data
  return results
}


export async function getAllResults(title = "", lang = "en-US") {
  let results = []
  const formattedTitle = title.split(' ').join("+")
  const path = "3/search/multi"
  const params = {
    query: formattedTitle,
    language: lang,
    api_key: import.meta.env.VITE_MAIN_API_KEY
  }
  // this call is to fetch total_pages for getting iterate count
  const data = await request(path, params)

  for (let i = 1; i <= data.total_pages; i++) {
    let data = await request(path, {...params, page: i})
    results.push(...data.results)
  }

  results = results.filter(res => res.media_type !== "person" && res.vote_count > 40)
  const ITEMS_PER_PAGE = 18
  const pages = Math.ceil(results.length / ITEMS_PER_PAGE)
  return { results, pages }
}


export async function getMediaByGenre(type, genreId) {
  const isAnimation = genreId === 16
  const isTalkShow = genreId === 10767
  const path = (type === "movie") ? "3/discover/movie" : "3/discover/tv"
  const params = {
    language: "en-US",
    with_genres: genreId,
    without_genres: `${isAnimation ? "" : "16"},${isTalkShow ? "" : "10767"},99,10762,10763,10764,10766`,
    api_key: import.meta.env.VITE_MAIN_API_KEY
  }
  const data = await request(path, params)
  const { results } = data
  return results
}

export async function getMediaRuntime(type, mediaId) {
  const path = `3/${type}/${mediaId}`
  const params = { api_key: import.meta.env.VITE_MAIN_API_KEY }
  const data = await request(path, params)
  return data.runtime
}

export async function getMovieDetails(movieId) {
  const path = `3/movie/${movieId}`
  // other append_to_response: reviews,
  const params = {
    append_to_response: "credits,videos,images,recommendations",
    api_key: import.meta.env.VITE_MAIN_API_KEY
  }
  const data = await request(path, params)
  return data
}

export async function getSeriesDetails(seriesId) {
  const path = `3/tv/${seriesId}`
  const params = {
    append_to_response: "credits,videos,images,recommendations",
    api_key: import.meta.env.VITE_MAIN_API_KEY
  }
  const data = await request(path, params)
  return data
}

/*
Note: "similar" is built by looking for items based on their keywords and genres. "recommendations" are built by looking at user ratings. Very different approaches. Similar does not tend to yield very good results.
--------------------------
recommended movies
Oppenheimer 872585
Napoleon 753342
The Batman 2022 414906
*/
export async function getRecommendedMovies(movieId) {
  const path = `3/movie/${movieId}/recommendations`
  const params = { language: "en-US", api_key: import.meta.env.VITE_MAIN_API_KEY }
  const data = await request(path, params)
  return data.results
}

export async function getSimilarMovies(movieId) {
  const path = `3/movie/${movieId}/similar`
  const params = { language: "en-US", api_key: import.meta.env.VITE_MAIN_API_KEY }
  const data = await request(path, params)
  return data
}

export async function getMovieTrailer(movieId) {
  const path = `3/movie/${movieId}/videos`
  const params = { api_key: import.meta.env.VITE_MAIN_API_KEY }
  const data = await request(path, params)
  let officialTrailers = data.results.filter(res => 
    res.type === "Trailer" && 
    res.official === true
  )

  let latestTrailer = officialTrailers[0].key
  let trailerUrl = `https://www.youtube.com/watch?v=${latestTrailer}`
  return trailerUrl
}

export async function getSomeNews() {
  // const path1 = "https://newsapi.org/v2/top-headlines"
  const path = "https://newsapi.org/v2/everything"
  const keywords = "(movie film upcoming cinema oscar drama marvel dune) OR (box AND office) OR (screen AND talk) OR (movie AND 2024) OR (movie AND 2025)"
  // const keywords = "Ryan Gosling Emma Stone"
  const params = {
    q: keywords,
    sortBy: "popularity",
    domains: "collider.com,variety.com,comingsoon.net,rottentomatoes.com",
    from: "2024-03-25",
    to: "2024-04-07",
    apiKey: import.meta.env.VITE_NEWS_API_KEY,
  }
  const data = await request(path, params)
  const {articles} = data
  return articles
}
