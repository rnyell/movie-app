import { useEffect, useState, useRef } from "react"
import { readLocalStorage, writeLocalStorage } from "./utils"

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
  const userGeoScheme = { ip: null, country: null } // FUT: ts
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
  const callbackRef = useRef(callback)

  function handler(event) {
    const target = event.target
    const isOutside = !element.contains(target)
    
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