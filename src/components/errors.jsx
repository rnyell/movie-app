import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ExclamationCircleIcon} from "@heroicons/outline"
import { modalVariants, defaultVariantsLabel, modalTransition } from "@utils/motions"

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
        variants={modalVariants}
        {...defaultVariantsLabel}
        transition={modalTransition}
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
