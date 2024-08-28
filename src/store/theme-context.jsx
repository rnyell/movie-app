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
  accent: "plum",
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
  }
}

export default function ThemeProvider({ children }) {
  const [preferences, prefDispatch] = useReducer(
    themeReducer,
    initialPreferences,
  )
  const { windowWidth } = useWindowOffsets()
  const isMobile = windowWidth < 520
  // const { country } = useGeoLocation()
  // const isVPNError = country === "IR"
  const isVPNError = false

  useEffect(() => {
    const rootElement = document.documentElement
    const theme = readLocalStorage("theme")
    const accent = readLocalStorage("accent")

    if (theme) {
      rootElement.dataset.theme = theme
    }

    if (accent) {
      rootElement.dataset.accent = accent
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
