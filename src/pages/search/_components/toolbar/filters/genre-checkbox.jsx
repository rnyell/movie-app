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


  return (
    <label htmlFor={genre.name}>
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
