import { ALL_GENRES } from "@utils/apis"
import GenreCheckbox from "./genre-checkbox"

const ALL_GENRES_ARRAY = []
for (let prop in ALL_GENRES) {
  ALL_GENRES_ARRAY.push({ name: ALL_GENRES[prop], id: prop })
}


export default function GenresList() {
  return (
    <div className="group genres-group">
      {ALL_GENRES_ARRAY.map(genre => (
        <GenreCheckbox key={genre.id} genre={genre} />
      ))}
    </div>
  )
}
