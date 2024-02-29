import { GENRES_IDS } from "./apis"

export async function extendedFetch(base, path = "", params = {}) {
  const url = new URL(path, base)
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


export function formatRuntime(runtime) {
  const hours = Math.trunc(runtime / 60)
  const mins = runtime % 60
  const formatted = (hours === 0) ? `${mins} m` : 
    (mins === 0) ? `${hours} h` : 
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
  return ids.map(id => GENRES_IDS[id])
}

export function generatePagination(currentPage, totalPages) {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
}