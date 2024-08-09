import { request } from "../lib/utils"

export const IMAGES_URL = "https://image.tmdb.org/t/p/"

export const MEDIA_TYPES = ["all", "movie", "tv"]

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
  // 10759: "Action & Adventure",
  10759: "Adventure",
  // 10765: "Sci-Fi & Fantasy",
  10765: "Fantasy",
  10768: "War & Politics",
  99: "Documentary",
  37: "Western",
  36: "History",
  10752: "War",
  10767: "Talk",
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
  // 10759: "Action & Adventure",
  10759: "Adventure",
  // 10765: "Sci-Fi & Fantasy",
  10765: "Fantasy",
  35: "Comedy",
  80: "Crime",
  9648: "Mystery",
  10767: "Talk",
  16: "Animation",
  37: "Western",
  10768: "War & Politics",
  99: "Documentary",
  /* 10762: "Kids",*/
  /* 10763: "News",*/
  /* 10764: "Reality",*/
  /* 10766: "Soap",*/
}

export const displayedMovieGenres = [
  { name: "Action", id: "28" },
  { name: "Drama", id: "18" },
  { name: "Thrillers", id: "53" },
  { name: "Crime", id: "80" },
  { name: "Sci-Fi", id: "878" },
  { name: "Comedy", id: "35" },
  { name: "Romance", id: "10749" },
  { name: "Musical", id: "10402" },
  { name: "Animation", id: "16" },
]

export const seriesDisplayedGenres = [
  { name: "Drama", id: "18" },
  { name: "Action and Adveture", id: "10759" },
  { name: "Sci-Fi and Fantasy", id: "10765" },
  { name: "Comedy", id: "35" },
  { name: "Mystery", id: "9648" },
  { name: "Crime", id: "80" },
]


export async function getComingMovies() {
  const path = "3/movie/upcoming"
  const params = {
    page: 1,
    language: "en-US",
    api_key: import.meta.env.VITE_MAIN_API_KEY,
  }
  const data = await request(path, params)
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
  const data = await request(path, params)
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
    api_key: import.meta.env.VITE_MAIN_API_KEY,
  }
  const data = await request(path, params)
  const { results } = data
  return results
}

export async function getTrendingMovies() {
  const path = "3/discover/movie"
  const params = {
    page: 1,
    language: "en-US",
    region: "US",
    include_adult: false,
    include_video: false,
    sort_by: "popularity.desc",
    "vote_count.gte": 200,
    without_genres: "16,99,10770",
    api_key: import.meta.env.VITE_MAIN_API_KEY
  }
  const data = await request(path, params)
  const { results } = data
  return results
}

export async function getTrendingSeries() {
  // const path = "3/discover/tv"
  const path = "3/trending/tv/week"
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
  const data = await request(path, params)
  const { results } = data
  return results
}


export async function getAllResults(title = "", lang = "en-US") {
  let results = []
  const formattedTitle = title?.split(' ').join("+")
  const path = "3/search/multi"
  const params = {
    query: formattedTitle,
    language: lang,
    api_key: import.meta.env.VITE_MAIN_API_KEY
  }
  // this call is to fetch total_pages for getting iterate count
  const data = await request(path, params)

  for (let i = 1; i <= data.total_pages; i++) {
    const data = await request(path, {...params, page: i})
    results.push(...data.results)
  }

  results = results.filter(res => res.media_type !== "person" && res.vote_count > 45)
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

// TODO getMovieDetails(id, { appendToResponse: [] })
export async function getMovieDetails(movieId) {
  const path = `3/movie/${movieId}`
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
    append_to_response: "credits,videos,images,recommendations,episode_groups",
    api_key: import.meta.env.VITE_MAIN_API_KEY
  }
  const data = await request(path, params)
  return data
}

export async function getAdditionalDetails(id) {
  const url = `https://www.omdbapi.com/?apikey=4109da8f&i=${id}`
  const res = await fetch(url)
  const data = await res.json()
  return data
}


//+ https://developer.themoviedb.org/reference/tv-series-on-the-air-list
//+ https://api.themoviedb.org/3/tv/{series_id}
/*
Note: "similar" is built by looking for items based on their keywords and genres. "recommendations" are built by looking at user ratings. Very different approaches. Similar does not tend to yield very good results.
recommended movies
Oppenheimer 872585
The Batman 2022 414906
*/
export async function getRecommendedMovies(movieId) {
  const path = `3/movie/${movieId}/recommendations`
  const params = { language: "en-US", api_key: import.meta.env.VITE_MAIN_API_KEY }
  const data = await request(path, params)
  return data.results
}

export async function getRecommendedSeries(seriesId) {
  const path = `3/tv/${seriesId}/recommendations`
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
