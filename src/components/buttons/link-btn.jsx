import { Link } from "react-router-dom"
import { ArrowTopRightOnSquareIcon } from "@heroicons/outline"


export default function LinkButton({ linkData }) {
  const {id, media, blank} = linkData
  const prevUrl = location.pathname + location.search
  const href = `/${media === "tv" ? "series" : "movies"}/${id}`
  const target = blank ? "_blank" : "_self"
  const state = { prevUrl }


  return (
    <Link
      className="main-btn link-btn"
      to={href}
      state={state}
      target={target}
      rel="noopener noreferrer"
    >
      <i className="icon arrow-icon">
        <ArrowTopRightOnSquareIcon />
      </i>
    </Link>
  )
}
