import { Link } from "react-router-dom"
import { ArrowTopRightOnSquareIcon } from "@heroicons/outline"
import { Button } from "@lib/ui/components"

export default function LinkButton({ linkData, ...props }) {
  const { id, media, blank } = linkData
  const { size, iconSize, className } = props
  const href = `/${media === "tv" ? "series" : "movies"}/${id}`
  const target = blank ? "_blank" : "_self"

  return (
    <Link to={href} target={target} rel="noopener noreferrer">
      <Button
        className={className}
        variant="solid-blured"
        size={size}
        isSquare
        iconOnly
        iconSize={iconSize}
        svg={<ArrowTopRightOnSquareIcon />}
      />
    </Link>
  )
}
