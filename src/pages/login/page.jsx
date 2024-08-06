import { useNavigate } from "react-router-dom"
import { signInWithGoogle, signInAnonymously } from "@lib/supabase/auth"
import { Button, Icon } from "@lib/ui/components"
import { GoogleIcon, DominoMaskIcon } from "@lib/ui/icons"


export default function LoginPage() {
  const navigate = useNavigate()

  async function handleAnonymousLogIn() {
    signInAnonymously()
    navigate(-1, { replace: true })
  }

  return (
    <main className="login-page flex-col-center h-100%">
      <div className="login-box align-center-col">
        <div className="logo-wrapper align-center">
          <img src="/logo.png" />
          <p className="unselectable">
            Your Dad's Best Movie App
          </p>
        </div>
        {/* <h2>Welcome!</h2> */}
        <p className="p">Choose how you'd like to get started:</p>
        <div className="flex-col">
          <Button size="md" customStyles="rounded-full" onClick={signInWithGoogle}>
            <Icon size="lg" svg={<GoogleIcon />} />
            <span>Continue with Google</span>
          </Button>
          <Button size="md" customStyles="rounded-full" onClick={handleAnonymousLogIn}>
            <Icon size="lg" svg={<DominoMaskIcon />} />
            <span>Explore anonymously</span>
          </Button>
        </div>
      </div>
      {/* <p>Back to <Link to="/">Home</Link></p> */}
    </main>
  )
}
