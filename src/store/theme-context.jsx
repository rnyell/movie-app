import { createContext, useContext, useEffect, useReducer } from "react"
import { useGeoLocation } from "@src/lib/hooks"
import { VPNError } from "@components/errors"
import { readLocalStorage, writeLocalStorage } from "@src/lib/utils"

const ThemeContext = createContext()

export function useThemeContext() {
  return useContext(ThemeContext)
}

const initialPreferences = {
  theme: "dark",
  accent: "pink",
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
  const [prefState, prefDispatch] = useReducer(themeReducer, initialPreferences)
  // const {country} = useGeoLocation()
  // const isVPNError = country === "IR"
  const isVPNError = false

  useEffect(() => {
    const htmlElement = document.documentElement
    const theme = readLocalStorage("theme")
    const accent = readLocalStorage("accent")

    if (theme) {
      htmlElement.dataset.theme = theme
    }

    if (accent) {
      htmlElement.dataset.accent = accent
    }
  }, [prefState.theme, prefState.accent])

  const contextValue = { prefState, prefDispatch }


  if (isVPNError) {
    return <VPNError />
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}
