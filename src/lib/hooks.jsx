import { useEffect, useState, useRef } from "react"
import { readLocalStorage, writeLocalStorage } from "./utils"


export function useLoader(fn, options = { dependencies: [] }) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const deps = [...options.dependencies]

  useEffect(() => {
    const controller = new AbortController()

    loader()

    return () => {
      controller.abort("Request canceled")
    }
  }, deps)

  async function loader() {
    try {
      const data = await fn()
      setData(data)
    } catch (err) {
      console.error(err)
      setError(err)
    } finally {
       setIsLoading(false)
     }
  }

  return { data, isLoading, error }
}


export function useWindowOffsets() {
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


// export function useBroadcastChannel(type, name, message) {
//   // type: "receiver" | "sender"
//   const channel = useRef(null)
//   const [state, setState] = useState(message)

//   function handleMessage(event) {
//     setState(event.data)
//   }

//   useEffect(() => {
//     channel.current = new BroadcastChannel(name)
//     channel.current.addEventListener("message", handleMessage)

//     if (type === "sender") {
//       channel.current.postMessage(message)
//     }

//     return () => {
//       channel.current.removeEventListener("message", handleMessage)
//       channel.current.close()
//     }
//   }, [name, type])

//   function sendMessage() {
//     if (channel.current && type === "sender") {
//       channel.current.postMessage(message)
//     }
//   }

//   return [state, sendMessage]
// }


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


export function useClickOutside(ref, callback, { exceptions = [] } = {}) {
  const element = ref.current
  const callbackRef = useRef(null)

  function handler(event) {
    event.stopPropagation()
    const target = event.target
    const isOutside = !element?.contains(target)
    const isException = exceptions.some(exception => exception.current?.contains(target))

    if (isOutside) {
      callbackRef.current(event)
    } else if (isException) {
      return
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
