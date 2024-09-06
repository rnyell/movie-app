import { strCapitalizer } from "@lib/utils"
import { useSearch } from "@src/store"

export default function TypeCheckbox({ type }) {
  const {searchOptions} = useSearch()
  const selectedType = searchOptions.filters.type

  const label_styles = `
    p-2 grow basis-0 text-center text-[0.85rem] font-medium border-1.5 border-solid border-primary-400 rounded-full transition-colors
    hover:bg-primary-500 hover:border-primary-500 has-[:checked]:bg-primary-200 has-[:checked]:border-primary-200 has-[:checked]:text-primary-900
    xs:p-2.5 xs:min-w-[5.5rem]
  `

  return (
    <label className={label_styles} htmlFor={type}>
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
