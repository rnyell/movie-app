import { Link, Navigate, useNavigate } from "react-router-dom"
import { signInWithGoogle, signInAnonymously } from "@lib/supabase/auth"
import { useAuth } from "@src/auth/auth-context"
import { Button, Icon } from "@lib/ui/components"
import { GoogleIcon, DominoMaskIcon } from "@lib/ui/icons"


export default function LoginPage() {
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()

  async function handleAnonymousLogIn() {
    signInAnonymously()
    navigate(-1, { replace: true })
  }

  if (isLoggedIn) {
    return <Navigate to="/" replace />
  } else {
    return (
      <main className="login-page h-screen flex-col-center">
        <div className="p-3.5 w-[clamp(350px,50%,450px)] align-center-col gap-4 bg-primary-800 border-1 border-solid border-primary-600 rounded-5xl">
          <div className="w-[max(140px,35%)] align-center">
            <img className="mr-2 w-[min(4rem,35px)]" src="/logo.png" />
            <p className="text-[11px] text-gray-400 unselectable"> {/* TODO: font-family: Geneva, Verdana, sans-serif;  */}
              Your Dad's Best Movie App
            </p>
          </div>
          {/* <h2>Welcome!</h2> */}
          <p className="mb-4 font-medium">Choose how you'd like to get started:</p>
          <div className="w-4/5 flex-col gap-3">
            <Button size="md" customStyles="rounded-full" onClick={signInWithGoogle}>
              <Icon size="lg" svg={<GoogleIcon />} />
              <span className="text-base font-semibold">Continue with Google</span>
            </Button>
            <Button size="md" customStyles="rounded-full" onClick={handleAnonymousLogIn}>
              <Icon size="lg" svg={<DominoMaskIcon />} />
              <span className="text-base font-semibold">Explore anonymously</span>
            </Button>
          </div>
          <Link className="mt-2 text-sm hover:underline" to="/">Back to Home</Link>
        </div>
      </main>
    )
  }
}
