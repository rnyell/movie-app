import { MOVIE_GENRES, TV_GENRES } from "./apis"


export async function request(path = "", params = {}) {
  const base = import.meta.env.VITE_MAIN_API_URL
  const url = new URL(path, base)
  Object.keys(params).forEach((param) =>
    url.searchParams.set(param, params[param])
  )

  try {
    const res = await fetch(url)
    const data = res.json()
    return data
  } catch (err) {
    console.log(err)
  }
}


export function readLocalStorage(key) {
  const value = localStorage.getItem(key) || null
  return JSON.parse(value)
}


export function writeLocalStorage(key, value) {
  if (typeof key === "string") {
    localStorage.setItem(key, JSON.stringify(value))
  } else {
    throw new Error("\"key\" must be a string")
  }
}


export function formatRuntime(runtime) {
  const hours = Math.trunc(runtime / 60)
  const mins = runtime % 60
  const formatted =
    hours === 0
      ? `${mins} m`
      : mins === 0
      ? `${hours} h`
      : `${hours} h ${mins} m`
  return formatted
}

export function formatRate(rate) {
  let rounded = Math.round(rate * 10) / 10
  if (String(rounded).length === 1) {
    return `${rounded}.0`
  }
  return rounded
}

export function formatReleaseDate(date) {
  return date?.substring(0, 4)
}


export function getMovieGenres(genres) {
  let returnValue = ""

  genres.forEach((genre) => {
    if (genre.name === "Science Fiction") {
      returnValue += "Sci-Fi, "
      return
    }
    returnValue += `${genre.name}, `
  })

  return returnValue.slice(0, -2)
}


export function getGenresWithIds(type = "movie", ids = []) {
  if (type === "movie") {
    return ids.map((id) => MOVIE_GENRES[id])
  } else if (type === "tv") {
    return ids.map((id) => TV_GENRES[id])
  }
}


export function getMovieDirector(crew = []) {
  return crew.filter(({ job }) => job === "Director")[0].name
}


export function devideItemsIntoPages(page, array) {
  const ITEMS_PER_PAGE = 18
  let arg1 = (page - 1) * ITEMS_PER_PAGE
  let arg2 = ITEMS_PER_PAGE * page
  return array.slice(arg1, arg2)
}


export function generatePagination(currentPage, totalPages) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages]
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages]
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ]
}

export function strCapitalizer(word) {
  return word.split(" ").map(el => el.substring(0, 1).toUpperCase() + el.substring(1, el.length)).join(" ")
}


const ITEMS_PER_PAGE = 18
export function filterResults(initialResults, selectedType, selectedGenres) {
  let filteredByGenres, filteredByType, pages;

  if (selectedGenres.length === 0) {
    filteredByGenres = initialResults
  } else {
    filteredByGenres = initialResults.filter(res => {
      for (let i = 0; i < selectedGenres.length; i++) {
        // genre_ids: number[] // selectedGenres: string[]
        if (res.genre_ids.includes(+selectedGenres[i])) {
          return true
        }
      }
    })
  }

  if (selectedType !== "all") {
    filteredByType = filteredByGenres.filter(item => item.media_type === selectedType)
    pages = Math.ceil(filteredByType.length / ITEMS_PER_PAGE)
  } else {
    filteredByType = filteredByGenres
    pages = Math.ceil(filteredByGenres.length / ITEMS_PER_PAGE)
  }

  return {results: filteredByType, pages}
}

export function sortResults(unsortedResults, sortby, order) {
  let sortedResults

  if (sortby === "none") {
    return unsortedResults
  }

  if (sortby === "popularity" || sortby === "vote_average") {
    if (order === "desc") {
      sortedResults = unsortedResults.toSorted(
        (a, b) => b[sortby] - a[sortby]
      )
    } else {
      sortedResults = unsortedResults.toSorted(
        (a, b) => a[sortby] - b[sortby]
      )
    }
  }

  // if (sortby === "title") {
  //   if (order === "desc") {
  //     sortedResults = unsortedResults.toSorted(
  //       (a, b) => b[sortby].localeCompare(a[sortby])
  //     )
  //   } else {
  //     sortedResults = unsortedResults.toSorted(
  //       (a, b) => a[sortby].localeCompare(b[sortby])
  //     )
  //   }
  // }

  return sortedResults
}


export const weekObjShort = {
  0: "Mon",
  1: "Tue",
  2: "Wed",
  3: "Thu",
  4: "Fri",
  5: "Sat",
  6: "Sun",
}

export const weekObj = {
  0: "Monday",
  1: "Tuesday",
  2: "Wednesday",
  3: "Thursday",
  4: "Friday",
  5: "Saturday",
  6: "Sunday",
}

export const monthObj = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
}
