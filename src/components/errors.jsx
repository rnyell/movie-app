import { ExclamationCircleIcon} from "@heroicons/outline"
import { Modal, Button } from "@lib/ui/components"

import "./errors.css"

export function VPNError() {
  return (
    <Modal withBackdrop={false} customStyles="overflow-visible">
      <div className="vpn-error relative flex-col">
        <p>Due to some restrictions in your area, accessing some domains has been limited. Unfortunately to access our app, you must use a <b>VPN</b>.</p>
        <p>Once connected, please <u>reload the page</u> or <u>press the button bellow</u> to continue.</p>
        <Button
          variants="solid-accent"
          size="xl"
          customStyles="ml-auto p-4"
          onClick={() => window.location.reload()}
        >
          Reload
        </Button>
        <i className="icon">
          <ExclamationCircleIcon />
        </i>
      </div>
    </Modal>
  )
}
