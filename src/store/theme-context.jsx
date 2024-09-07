import { createContext, useContext, useEffect, useReducer } from "react"
import { useGeoLocation, useWindowOffsets } from "@lib/hooks"
import { readLocalStorage, writeLocalStorage } from "@lib/utils"
import { VPNError } from "@components/errors"

const ThemeContext = createContext()

export function useThemeContext() {
  return useContext(ThemeContext)
}

const initialPreferences = {
  theme: "dark",
  accent: "indigo",
  cursor: "auto"
}

function themeReducer(state, action) {
  switch (action.type) {
    case "change_theme": {
      const { theme } = action
      writeLocalStorage("theme", theme)
      return { ...state, theme }
    }
    case "change_accent": {
      const { accent } = action
      writeLocalStorage("accent", accent)
      return { ...state, accent }
    }
    case "change_cursor": {
      const { cursor } = action
      writeLocalStorage("cursor", cursor)
      return { ...state, cursor }
    }
  }
}

export default function ThemeProvider({ children }) {
  const [preferences, prefDispatch] = useReducer(themeReducer, initialPreferences)
  const { windowWidth } = useWindowOffsets()
  const isMobile = windowWidth <= 520
  // const { country } = useGeoLocation()
  // const isVPNError = country === "IR"
  const isVPNError = false

  useEffect(() => {
    const rootElement = document.documentElement
    const theme = readLocalStorage("theme")
    const accent = readLocalStorage("accent")
    const cursor = readLocalStorage("cursor")

    if (theme) {
      rootElement.dataset.theme = theme
      prefDispatch({ type: "change_theme", theme })
    }

    if (accent) {
      rootElement.dataset.accent = accent
      prefDispatch({ type: "change_accent", accent })
    }

    if (cursor) {
      rootElement.dataset.cursor = cursor
      prefDispatch({ type: "change_accent", cursor })
    }
  }, [preferences.theme, preferences.accent])

  const contextValue = { preferences, prefDispatch, windowWidth, isMobile }

  if (isVPNError) {
    return <VPNError />
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}
