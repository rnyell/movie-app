import { Link } from "react-router-dom"
import { ArrowTopRightOnSquareIcon } from "@heroicons/outline"
import { transformTitleToURL, writeLocalStorage } from "@utils/utils"


export default function LinkButton({ linkData }) {
  const {id, title, media, blank} = linkData
  const prevUrl = location.pathname + location.search
  const href = `/${transformTitleToURL(title)}`
  const target = blank ? "_blank" : "_self"
  const state = { id, media, prevUrl }

  function handleNavigate() {
    writeLocalStorage("linkData", state)
  }


  return (
    <Link
      className="main-btn link-btn"
      to={href}
      state={state}
      target={target}
      rel="noopener noreferrer"
      onClick={handleNavigate}
    >
      <i className="icon arrow-icon">
        <ArrowTopRightOnSquareIcon />
      </i>
    </Link>
  )
}
