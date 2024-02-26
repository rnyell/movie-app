import { GENRES_IDS } from "./apis"

export async function extendedFetch(path = "", params = {}) {
  const BASE_URL = "https://api.themoviedb.org"
  const url = new URL(path, BASE_URL)
  Object.keys(params).forEach(param =>
    url.searchParams.set(param, params[param])
  )
  
  try {
    const res = await fetch(url)
    const data = res.json()
    return data
  } catch(err) {
    console.log(err)
  }
}


export function loader() {

}


export function formatRuntime(runtime) {
  const hours = Math.trunc(runtime / 60)
  const mins = runtime % 60
  const formatted = hours === 0 ?
    `${mins} m` : 
    `${hours} h ${mins} m`;

  return formatted
}

export function getMovieGenres(genres = []) {
let returnValue = ""

  genres.forEach(genre => {
    if (genre.name === "Science Fiction") {
      returnValue += "Sci-Fi, "
      return
    }
    returnValue += `${genre.name}, `
  })

  return returnValue.slice(0, -2)
}

export function getMovieGenresBaseOnIds(ids = []) {
  const genresArray = ids.map(id => GENRES_IDS[id])
  return genresArray.join(", ")
}
