import { Link, useLocation } from "react-router-dom"
import { ArrowTopRightOnSquareIcon } from "@heroicons/outline"
import { transformTitleToURL } from "@utils/utils"


export default function LinkButton({ linkData }) {
  const {id, title, media} = linkData
  const location = useLocation()
  const href = `/${transformTitleToURL(title)}`
  const state = {
    id: id,
    media: media,
    prevUrl: location.pathname + location.search,
  }


  return (
    <Link
      className="square-btn link-btn"
      to={href}
      state={state}
    >
      <i className="icon arrow-icon">
        <ArrowTopRightOnSquareIcon />
      </i>
    </Link>
  )
}
