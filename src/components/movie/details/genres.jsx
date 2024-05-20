import { getMovieGenres, getGenresWithIds } from "@utils/utils"


export default function Genres({ genres = [], media }) {
  return (
    <div className="genres">
      <span>
        {genres[0].name ? getMovieGenres(genres) : getGenresWithIds(media, genres)}
      </span>
    </div>
  )
}
