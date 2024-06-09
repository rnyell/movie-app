import { useEffect, useState } from "react"
import { getMovieDetails, getSeriesDetails } from "./movies-services"
import { getSomeNews } from "./news-services"


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
    const controller = new AbortController()

    if (media === "movie") {
      loadMovieDetails()
    } else if (media === "tv") {
      loadSeriesDetails()
    }

    return () => controller.abort()
  }, [id])

  return {isLoading, mediaDetails}
}


export function useNewsService() {
  const [news, setNews] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    fetchNews()

    return () => controller.abort()
  }, [])
  
  async function fetchNews() {
    const data = await getSomeNews()
    setNews(data)
    setIsLoading(false)
  }

  return {isLoading, news}
}
