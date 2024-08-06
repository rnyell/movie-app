import { signInWithGoogle, signInAnonymously } from "@lib/supabase/auth"
import { GoogleIcon, DominoMaskIcon } from "@lib/ui/icons"
import { Modal, Button, Icon } from "@lib/ui/components"
import { XMarkIcon } from "@heroicons/outline"


export default function LoginModal({ setClose, message }) {
  function handleAnonymousSingIn() {
    signInAnonymously()
    setClose()
  }

  return (
    <Modal size="md" customStyles="top-20%" setClose={setClose}>
      <div className="login-box align-center-col">
        <Button
          variants="ghost"
          size="square-sm"
          iconOnly
          iconSize="sm"
          svg={<XMarkIcon />}
          customStyles="absolute top-3 right-3 rounded-full"
          onClick={setClose}
        />
        <p className="msg">{message}</p>
        <div className="flex-col">
          <Button size="md" customStyles="rounded-full" onClick={signInWithGoogle}>
            <Icon size="lg" svg={<GoogleIcon />} />
            <span>Log in with Google</span>
          </Button>
          <Button size="md" customStyles="rounded-full" onClick={handleAnonymousSingIn}>
            <Icon size="lg" svg={<DominoMaskIcon />} />
            <span>Continue anonymously</span>
          </Button>
        </div>
      </div>
    </Modal>
  )
}
