import CommonCard from "./variants/common"
import ResultCard from "./variants/result"
import ScreenCard from "./variants/screen"
import SeriesCard from "./variants/series"
import SimilarCard from "./variants/similar"
import PlayedCard from "./variants/played"
import BookmarkedCard from "./variants/bookmarked"


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
