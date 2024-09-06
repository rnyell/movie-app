import { ALL_GENRES } from "@services"
import GenreCheckbox from "./genre-checkbox"

const ALL_GENRES_ARRAY = []

for (let prop in ALL_GENRES) {
  ALL_GENRES_ARRAY.push({ name: ALL_GENRES[prop], id: prop })
}

export default function GenresList() {
  return (
    <div className="pb-6 h-[7.25rem] max-w-[275px] w-full overflow-y-scroll flex-wrap gap-1.5 xs:gap-2" style={{scrollbarWidth: "thin"}}>
      {ALL_GENRES_ARRAY.map(genre => (
        <GenreCheckbox key={genre.id} genre={genre} />
      ))}
    </div>
  )
}
