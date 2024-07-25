const ITEMS_PER_PAGE = 18
export default function filterResults(initialResults, selectedType, selectedGenres) {
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
