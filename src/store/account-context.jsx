import { createContext, useContext } from "react"

const AccountContext = createContext()

export function useAccountContext() {
  return useContext(AccountContext)
}


export default function AccountProvider({ children }) {

  const contextValue = {

  }


  return (
    <AccountContext.Provider value={contextValue}>
      {children}
    </AccountContext.Provider>
  )
}
