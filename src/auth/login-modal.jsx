import { signInWithGoogle, signInAnonymously } from "@src/lib/supabase/auth"
import { GoogleIcon, DominoMaskIcon } from "@src/lib/ui/icons"
import { Modal, Button, Icon } from "@src/lib/ui/components"


export default function LoginModal({ setModal, message }) {
  return (
    <Modal setClose={() => setModal(false)}>
      <div className="login-box align-center-col">
        <div className="logo-wrapper align-center">
          <img src="/logo.png" />
          <p className="unselectable">
            Your Dad's Best Movie App
          </p>
        </div>
        <p>{message}</p>
        <div className="flex-col">
          <Button size="md" customStyles="rounded-full" onClick={signInWithGoogle}>
            <Icon size="lg" svg={<GoogleIcon />} />
            <span>Log in with Google</span>
          </Button>
          <Button size="md" customStyles="rounded-full" onClick={signInAnonymously}>
            <Icon size="lg" svg={<DominoMaskIcon />} />
            <span>Continue anonymously</span>
          </Button>
        </div>
      </div>
    </Modal>
  )
}
