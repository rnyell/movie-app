import CommonCard from "./movie-cards/common-card"
import ScreenCard from "./movie-cards/screen-card"
import SeriesCard from "./movie-cards/series-card"
import SimilarCard from "./movie-cards/similar-card"
import PlayedCard from "./movie-cards/played-card"
import BookmarkedCard from "./movie-cards/bookmark-card"
import ResultCard from "./movie-cards/result-card"


export default function MovieCard({ result, media, variant, ...rest }) {
  switch (variant) {
    case "common": {
      return <CommonCard {...{result, media, variant}} />
    }

    case "screen": {
      const { idx } = rest
      return <ScreenCard result={result} idx={idx} variant={variant} />
    }

    case "series": {
      return <SeriesCard {...{result, media, variant}} />
    }

    case "similar": {
      return <SimilarCard {...{result, media, variant}} />
    }

    case "played": {
      return <PlayedCard {...{result, media, variant}} />
    }

    case "bookmarked": {
      return <BookmarkedCard {...{result, media, variant}} />
    }

    case "result": {
      return <ResultCard {...{result, media, variant}} />
    }
  }
  
}
