import { request, sortResults } from "./utils"

const BASE_URL = "https://api.themoviedb.org"
const API_KEY = "9f1ffd64abd4bde18614fd9087d87d71"

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
  37: "Western",
  10770: "TV Movie",
  99: "Documentary",
}

export const TV_GENRES = {
  10759: "Action & Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  10762: "Kids",
  9648: "Mystery",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
  37: "Western"
}


// ~'/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'
// ~'3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'
//~ https://api.themoviedb.org/3/trending/all/week?language=en-US"
//~ https://api.themoviedb.org/3/tv/{series_id}

//* https://api.themoviedb.org/3/movie/upcoming
//* https://api.themoviedb.org/3/movie/now_playing

//~ /3/movie/{movie_id}/similar

export async function getComingMovies() {
  const path = "3/movie/upcoming"
  let data = await request(BASE_URL, path, {
    page: 1,
    language: "en-US",
    api_key: API_KEY
  })

  const { results } = data
  console.log(data)
  return results
}


export async function getOnScreenMovies() {
  const path = "3/movie/now_playing"
  let data = await request(BASE_URL, path, {
    page: 1,
    language: "en-US",
    api_key: API_KEY
  })

  const { results } = data
  console.log(data)
  return results
}


export async function getPopularMovies() {
  const path = "3/movie/popular"
  let data = await request(BASE_URL, path, {
    page: 1,
    language: "en-US",
    api_key: API_KEY
  })

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
    api_key: API_KEY
  }
  // this call is to fetch total_pages for getting iterate count
  const data = await request(BASE_URL, path, params)

  for (let i = 1; i <= data.total_pages; i++) {
    let data = await request(BASE_URL, path, {...params, page: i})
    results.push(...data.results)
  }

  results = results.filter(res => res.media_type !== "person" && res.vote_count > 40)
  const ITEMS_PER_PAGE = 18
  const pages = Math.ceil(results.length / ITEMS_PER_PAGE)
  return { results, pages }
}


export async function getSearchedSeries(title = "", lang = "en-US") {
  let formattedTitle = title.split(' ').join("+")
  const path = "3/search/tv"
  let data = await request(BASE_URL, path, {
    query: formattedTitle,
    language: lang,
    api_key: API_KEY
  })

  const { 
    results, 
    total_results: totalResults, 
    total_pages: totalPages 
  } = data
  return { results, totalResults, totalPages }
}


export async function getMovieDetails(movieId) {
  const path = `3/movie/${movieId}`
  let data = await request(BASE_URL, path, {
    api_key: API_KEY,
    append_to_response: "credits,videos,images",
  })

  return data
}

export async function getMovieTrailer(movieId) {
  const path = `3/movie/${movieId}/videos`
  let data = await request(BASE_URL, path, {
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
* Trending is another type of "popularity" score on TMDB but unlike popularity, trending's time windows are much shorter (daily, weekly). This helps us surface the relevant content of today (the new stuff) much easier.
`${BASE_URL}/search/movie?language=en-US&query=${query}&include_adult=false&year=${currentYear}&page=${currentPage}&api_key=${API_KEY}`
`${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York`
//// 3/search/movie?include_adult=false&language=en-US&page=1
*/
// export async function getMovies(title = "", lang?: string) {
//   const formattedTitle = title.split(' ').join("+");
//   const path = "3/search/movie";
//   const params = {
//     query: formattedTitle,
//     language: lang,
//     api_key: API_KEY
//   };
//   const movies: any[] = [];
//   const data = await request(BASE_URL, path, params);
//   const { total_pages: totalPages } = data;
//   for (let i = 1; i <= totalPages; i++) {
//     let data = await request(BASE_URL, path, { ...params, page: i });
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
//     api_key: API_KEY
//   };
//   const series: any[] = [];
//   const data = await request(BASE_URL, path, params);
//   const { total_pages: totalPages } = data;
//   for (let i = 1; i <= totalPages; i++) {
//     let data = await request(BASE_URL, path, { ...params, page: i });
//     series.push(...data.results);
//   }
//   const results = series.filter(s => s.vote_count > 50);
//   return results;
// }
// export async function getAllResults(title = "", lang = "en-US") {
//   const moveis = await getMovies(title, lang);
//   const series = await getSeries(title, lang);
//   const results: any[] = [...series, ...moveis];
//   const pages = Math.ceil(results.length / ITEMS_PER_PAGE);
//   console.log(results);
//   return { results, pages };
// }

// export async function getSearchedMovies(title = "", page = 1) {
//   let formattedTitle = title.split(' ').join("+")
//   let data = await request(BASE_URL, "3/search/movie", {
//     query: formattedTitle,
//     language: "en-US",
//     page: page,
//     api_key: API_KEY
//   })

//   const { 
//     results, 
//     total_results: totalResults, 
//     total_pages: totalPages
//   } = data

//   return { results, totalResults, totalPages }
// }