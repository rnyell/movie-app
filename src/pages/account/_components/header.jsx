import { Link } from "react-router-dom"
import { Button } from "@lib/ui/components"
import { EllipsisVerticalIcon } from "@heroicons/solid"

export default function Header({ heading, href }) {
  return (
    <header className="flex">
      <h3 className="mb-5">{heading}</h3>
      <div className="ml-auto align-center gap-4">
        {/* <Button
          variants="ghost"
          size="square-xs"
          iconOnly
          iconSize="md"
          svg={<EllipsisVerticalIcon />}
        /> */}
        <Link className="p-2 text-sm rounded-md hover:bg-primary-700" to={href}>View All</Link>
      </div>
    </header>
  )
}
