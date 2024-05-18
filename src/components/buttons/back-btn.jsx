import { Link } from "react-router-dom"
import { ChevronLeftIcon } from "@heroicons/outline"


export default function BackButton({ url }) {

  return (
    <Link to={url} className="main-btn back-btn">
      <i className="icon">
        <ChevronLeftIcon />
      </i>
    </Link>
  )
}
