import { ExclamationCircleIcon} from "@heroicons/outline"
import { Modal, Button } from "@lib/ui/components"

export function VPNError() {
  const icon_styles = `
    size-9 absolute -top-2 -right-2 bg-[var(--bg-base-color)] text-primary-400 rounded-full outline outline-4 outline-[var(--bg-base-color)]
  `

  return (
    <Modal withBackdrop={false} size="lg" customStyles="overflow-visible">
      <div className="vpn-error p-6 relative flex-col rounded-4xl bg-primary-800">
        <p className="mb-2 leading-[1.5]">
          Due to some restrictions in your area, accessing some domains has been limited. Unfortunately to access our app, you must use a <b className="font-bold text-[var(--color-accent-400)]">VPN</b>.
        </p>
        <p className="mb-2 leading-[1.5]">Once connected, please <u className="decoration-[var(--color-accent-300)]">reload the page</u> or <u className="decoration-[var(--color-accent-300)]">press the button bellow</u> to continue.</p>
        <Button
          variants="solid-accent"
          size="lg"
          customStyles="ml-auto w-28"
          onClick={() => window.location.reload()}
        >
          Reload
        </Button>
        <i className={icon_styles}>
          <ExclamationCircleIcon />
        </i>
      </div>
    </Modal>
  )
}
