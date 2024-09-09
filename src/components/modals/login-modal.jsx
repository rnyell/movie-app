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
    <Modal size="md" className="top-[20%]" setClose={setClose}>
      <div className="p-3 align-center-col gap-2 bg-primary-800">
        <Button
          variant="ghost"
          size="sm"
          isSquare
          iconOnly
          iconSize="sm"
          svg={<XMarkIcon />}
          className="absolute top-3 right-3 rounded-full"
          onClick={setClose}
        />
        <p className="mt-8 mb-6 w-[85%] font-medium">{message}</p>
        <div className="w-4/5 flex-col gap-3">
          <Button
            size="md"
            className="rounded-full"
            onClick={signInWithGoogle}
          >
            <Icon size="lg" svg={<GoogleIcon />} />
            <span className="mx-auto text-[0.9rem] font-medium">
              Log in with Google
            </span>
          </Button>
          <Button
            size="md"
            className="rounded-full"
            onClick={handleAnonymousSingIn}
          >
            <Icon size="lg" svg={<DominoMaskIcon />} />
            <span className="mx-auto text-[0.9rem] font-medium">
              Continue anonymously
            </span>
          </Button>
        </div>
      </div>
    </Modal>
  )
}
