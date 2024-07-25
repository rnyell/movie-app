import { MEDIA_TYPES } from "@services"
import TypeCheckbox from "./type-checkbox"

export default function TypeList() {
  return (
    <div className="group type-group flex">
      {MEDIA_TYPES.map(type => (
        <TypeCheckbox key={type} type={type} />
      ))}
    </div>
  )
}
