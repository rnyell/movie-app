import { useAuth } from "./auth-context"
import { Navigate } from "react-router-dom"


export default function AuthRoute({ children }) {
  const { session, isLoaded } = useAuth()

  if (isLoaded) {
    if (session) {
      return children
    } else {
      return <Navigate to="/login" replace />
    }
  }
}
