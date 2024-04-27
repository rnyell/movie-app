import { strCapitalizer } from "@utils/utils"
import { useSearch } from "@src/store/search-context"

export default function TypeCheckbox({ type }) {
  const {searchOptions} = useSearch()
  const selectedType = searchOptions.filters.type

  return (
    <label htmlFor={type}>
      {type === "tv" ? "TV" : strCapitalizer(type)}
      <input
        type="radio"
        name="type"
        id={type}
        value={type}
        defaultChecked={selectedType === type}
      />
    </label>
  )
}
