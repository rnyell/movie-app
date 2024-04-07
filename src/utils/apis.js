import { request, sortResults } from "./utils"


export const MOVIE_GENRES = {
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
  10770: "TV Movie",
  99: "Documentary",
  37: "Western",
}

export const TV_GENRES = {
  10759: "Action & Adventure",
  35: "Comedy",
  80: "Crime",
  18: "Drama",
  10751: "Family",
  9648: "Mystery",
  10765: "Sci-Fi & Fantasy",
  16: "Animation",
  10768: "War & Politics",
  37: "Western",
  /* 99: "Documentary" ,*/
  /* 10762: "Kids",*/
  /* 10764: "Reality",*/
  /* 10766: "Soap",*/
  /* 10767: "Talk",*/
  /* 10763: "News",*/
}

// ~'/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'
// ~'3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'
//~ https://api.themoviedb.org/3/trending/all/week?language=en-US"

//~ /3/movie/{movie_id}/similar

//+ series
//+ https://developer.themoviedb.org/reference/tv-series-on-the-air-list
//+ https://api.themoviedb.org/3/tv/{series_id}

export async function getComingMovies() {
  const path = "3/movie/upcoming"
  const params = {
    page: 1,
    language: "en-US",
    api_key: import.meta.env.VITE_API_KEY
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
    api_key: import.meta.env.VITE_API_KEY
  }
  let data = await request(path, params)
  const { results } = data
  return results
}


export async function getPopularMovies() {
  const path = "3/movie/popular"
  const params = {
    page: 1,
    language: "en-US",
    api_key: import.meta.env.VITE_API_KEY
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
    include_adult: false,
    sort_by: "popularity.desc",
    "vote_count.gte": 200,
    include_null_first_air_dates: false,
    without_genres: "99,10762,10763,10764,10766,10767",
    api_key: import.meta.env.VITE_API_KEY
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
    api_key: import.meta.env.VITE_API_KEY
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


export async function getMoviesByGenre(genreId) {
  const path = "3/discover/movie"
  const params = {
    language: "en-US",
    with_genres: genreId,
    api_key: import.meta.env.VITE_API_KEY
  }
  const data = await request(path, params)
  // console.log(data)
  const { results } = data
  return results
}


export async function getMovieDetails(movieId) {
  const path = `3/movie/${movieId}`
  const params = { api_key: import.meta.env.VITE_API_KEY, append_to_response: "credits,videos,images" }
  let data = await request(path, params)
  return data
}

export async function getMovieRuntime(movieId) {
  const path = `3/movie/${movieId}`
  const params = { api_key: import.meta.env.VITE_API_KEY }
  let data = await request(path, params)
  return data.runtime
}

export async function getMovieTrailer(movieId) {
  const path = `3/movie/${movieId}/videos`
  const params = { api_key: import.meta.env.VITE_API_KEY }
  let data = await request(path, params)
  let officialTrailers = data.results.filter(res => 
    res.type === "Trailer" && 
    res.official === true
  )

  let latestTrailer = officialTrailers[0].key
  let trailerUrl = `https://www.youtube.com/watch?v=${latestTrailer}`
  return trailerUrl
}

// export async function getMovies(title = "", lang?: string) {
//   const formattedTitle = title.split(' ').join("+");
//   const path = "3/search/movie";
//   const params = {
//     query: formattedTitle,
//     language: lang,
//     api_key: import.meta.env.VITE_API_KEY
//   };
//   const movies: any[] = [];
//   const data = await request(path, params);
//   const { total_pages: totalPages } = data;
//   for (let i = 1; i <= totalPages; i++) {
//     let data = await request(path, { ...params, page: i });
//     movies.push(...data.results);
//   }
//   const results = movies.filter(movie => movie.vote_count > 50);
//   return results
// }

// export async function getSeries(title = "", lang?: string) {
//   const formattedTitle = title.split(' ').join("+");
//   const path = "3/search/tv";
//   const params = {
//     query: formattedTitle,
//     language: lang,
//     api_key: import.meta.env.VITE_API_KEY
//   };
//   const series: any[] = [];
//   const data = await request(path, params);
//   const { total_pages: totalPages } = data;
//   for (let i = 1; i <= totalPages; i++) {
//     let data = await request(path, { ...params, page: i });
//     series.push(...data.results);
//   }
//   const results = series.filter(s => s.vote_count > 50);
//   return results;
// }

// export async function getSearchedMovies(title = "", page = 1) {
//   let formattedTitle = title.split(' ').join("+")
//   let data = await request("3/search/movie", {
//     query: formattedTitle,
//     language: "en-US",
//     page: page,
//     api_key: import.meta.env.VITE_API_KEY
//   })
//   const { 
//     results, 
//     total_results: totalResults, 
//     total_pages: totalPages
//   } = data
//   return { results, totalResults, totalPages }
// }