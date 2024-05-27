import { useEffect, useState } from "react"
import { getMovieDetails, getSeriesDetails } from "./movies-services"


export function useMediaDetails(media, id) {
  const [mediaDetails, setMediaDetails] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  async function loadMovieDetails() {
    const data = await getMovieDetails(id)
    setMediaDetails(data)
    setIsLoading(false)
  }

  async function loadSeriesDetails() {
    const data = await getSeriesDetails(id)
    setMediaDetails(data)
    setIsLoading(false)
  }

  useEffect(() => {
    if (media === "movie") {
      loadMovieDetails()
    } else if (media === "tv") {
      loadSeriesDetails()
    }
  }, [])

  return { mediaDetails, isLoading }
}
