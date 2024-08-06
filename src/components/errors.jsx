import { Link } from "react-router-dom"
import { ExclamationCircleIcon} from "@heroicons/outline"
import { Modal, Button } from "@lib/ui/components"


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

export function NotFoundResult() {
  return (
    <section className="not-found-result">
      <div className="wrapper">
        <h3>No results found...</h3>
        <p>Make sure to enter the correct title.</p>
        <div className="links flex">
          <Link to="/discover/movies">See popular movies</Link>
          <Link to="/discover/series">See trend series</Link>
        </div>
      </div>
      <img className="gif" src="/gifs/jt.gif" />
    </section>
  )
}
