import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ExclamationCircleIcon} from "@heroicons/outline"

export function ErrorPage() {
  return (
    <div className="error-page">
      <h2 className="heading">404 not found</h2>
      <div className="links">
        <Link to="/" className="btn">Home page</Link>
        <Link to="/search" className="btn">Discover movies</Link>
      </div>
    </div>
  )
}

export function VPNError() {
  return (
    <section className="vpn-error">
      <motion.div
        initial={{ y: -55 }}
        animate={{ y: 0 }}
        transition={{ ease: "easeOut", duration: 0.5 }}
      >
        <p>Due to some restrictions in your area, accessing some domains has been limited. Unfortunately to access our app, you must use a <b>VPN</b>.</p>
        <p>Once connected, please <u>reload the page</u> or <u>press the button bellow</u> to continue.</p>
        <button onClick={() => window.location.reload()}>
          Reload
        </button>
        <i className="icon">
          <ExclamationCircleIcon />
        </i>
      </motion.div>
    </section>
  )
}

export function NotFoundResult() {
  return (
    <section className="not-found-result">
      <div>
        <h3>No results found...</h3>
        <p>Try another one</p>
        <Link>See trend movies</Link>
      </div>
      <img className="gif" src="/gifs/jt.gif" />
    </section>
  )
}