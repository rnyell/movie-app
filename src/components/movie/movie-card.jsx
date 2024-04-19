import { useEffect, useRef, useState } from "react"
import CommonCard from "./movie-cards/common-card"
import ScreenCard from "./movie-cards/screen-card"
import PlayedCard from "./movie-cards/played-card"
import SeriesCard from "./movie-cards/series-card"
import BookmarkedCard from "./movie-cards/bookmark-card"
import ResultCard from "./movie-cards/result-card"

export default function MovieCard({ result, type, variant, ...rest }) {

  switch (variant) {
    case "list": {
      return <CommonCard result={result} type={type} variant={variant} />
    }

    case "screen": {
      return <ScreenCard result={result} type={type} variant={variant} />
    }

    case "series": {
      return <SeriesCard result={result} type={type} variant={variant} />
    }

    case "played": {
      return <PlayedCard result={result} type={type} variant={variant} />
    }

    case "bookmarked": {
      const { clearBookmark } = rest

      return (
        <BookmarkedCard
          result={result}
          type={type}
          variant={variant}
          clearBookmark={clearBookmark}
        />
      )
    }

    case "result": {
      return <ResultCard result={result} type={type} variant={variant} />
    }
  }
  
}
