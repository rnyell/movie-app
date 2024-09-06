import { MEDIA_TYPES } from "@services"
import TypeCheckbox from "./type-checkbox"

export default function TypeList() {
  return (
    <div className="mt-4 flex gap-2">
      {MEDIA_TYPES.map(type => (
        <TypeCheckbox key={type} type={type} />
      ))}
    </div>
  )
}
