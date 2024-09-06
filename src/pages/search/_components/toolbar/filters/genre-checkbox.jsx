import { useEffect, useState } from "react"
import { useSearch } from "@src/store"

export default function GenreCheckbox({ genre }) {
  const {searchOptions} = useSearch()
  const selectedGenres = searchOptions.filters.genres
  const [isChecked, setIsChecked] = useState(false)
  
  useEffect(() => {
    if (selectedGenres.includes(genre.id)) {
      setIsChecked(true)
    } else {
      setIsChecked(false)
    }
  }, [])

  function handleChange({target}) {
    setIsChecked(target.checked)
  }

  const label_styles = `
    p-2 text-[0.65rem] text-center rounded-2xl bg-primary-700 transition-colors
    hover:bg-primary-600 has-[:checked]:bg-primary-300 has-[:checked]:text-primary-900
  `

  return (
    <label className={label_styles} htmlFor={genre.name}>
      {genre.name}
      <input
        type="checkbox"
        name="genre"
        id={genre.name}
        value={genre.id}
        checked={isChecked}
        onChange={handleChange}
      />
    </label>
  )
}
