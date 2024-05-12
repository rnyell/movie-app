import CommonCard from "./movie-cards/common-card"
import ScreenCard from "./movie-cards/screen-card"
import SeriesCard from "./movie-cards/series-card"
import PlayedCard from "./movie-cards/played-card"
import BookmarkedCard from "./movie-cards/bookmark-card"
import ResultCard from "./movie-cards/result-card"

export default function MovieCard({ result, media, variant, ...rest }) {

  switch (variant) {
    case "common": {
      return <CommonCard result={result} media={media} variant={variant} />
    }

    case "screen": {
      return <ScreenCard result={result} media={media} variant={variant} />
    }

    case "series": {
      return <SeriesCard result={result} media={media} variant={variant} />
    }

    case "played": {
      return <PlayedCard result={result} media={media} variant={variant} />
    }

    case "bookmarked": {
      const { clearBookmark } = rest

      return (
        <BookmarkedCard
          result={result}
          media={media}
          variant={variant}
          clearBookmark={clearBookmark}
        />
      )
    }

    case "result": {
      return <ResultCard result={result} media={media} variant={variant} />
    }
  }
  
}
