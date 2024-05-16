import { useEffect, useState, useRef } from "react"
import { readLocalStorage, writeLocalStorage } from "./utils"
import { getMovieDetails, getSeriesDetails } from "./apis"

export function useFetch(url, options = {}) {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const fetcher = options.fetcher

  useEffect(() => {
    const controller = new AbortController()
    loader()

    return () => {
      controller.abort("Request canceled")
    }
  }, [url])
  
  async function loader() {
    if (fetcher) {
      try {
        const data = await fetcher()
        setData(data)
      } catch(err) {
        setError(err)
      } finally {
        setIsLoading(false)
      }
    } else {
      fetch(url)
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => setError(err))
      .finally(() => setIsLoading(false))
    }
  }

  return { data, isLoading, error }
}


export function useWindow() {
  const [windowSize, setWindowSize] = useState({
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight
  })

  useEffect(() => {
    handleResizeEvent()
    window.addEventListener("resize", handleResizeEvent)
    return () => {
      window.removeEventListener("resize", handleResizeEvent)
    }
  }, [])

  function handleResizeEvent() {
    setWindowSize({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    })
  }

  return {...windowSize}
}


export function useLocalStorage(key, fallbackValue = "") {
  const [value, setValue] = useState(
    readLocalStorage(key) ?? fallbackValue
  )

  useEffect(() => {
    writeLocalStorage(key, value)
  }, [key, value])

  return [value, setValue]
}


export function useGeoLocation() {
  const userGeoScheme = { ip: null, country: null }
  const [userGeo, setUserGeo] = useState(userGeoScheme)

  useEffect(() => {
    getUserCountry()
  }, [])

  async function getUserCountry() {
    try {
      const res = await fetch(`https://api.country.is`)
      const data = await res.json()
      setUserGeo(data)
    } catch (error) {
      console.error("Error fetching user location:", error)
    }
  }

  return userGeo
}


export function useClickOutside(ref, callback) {
  const element = ref.current
  const callbackRef = useRef(callback) //? the benefits of the "ref" is not clear...

  function handler(event) {
    event.stopPropagation()
    const target = event.target
    // console.log(element, target) //? too many cals
    const isOutside = !element?.contains(target)
    
    if (isOutside) {
      callbackRef.current(event)
    }
  }

  useEffect(() => {
    callbackRef.current = callback
}, [callback])

  useEffect(() => {
    document.addEventListener("click", handler)
    return () => {
      document.removeEventListener("click", handler)
    }
  }, [element])
}


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
