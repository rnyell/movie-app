import CommonCard from "./cards/common"
import ResultCard from "./cards/result"
import ScreenCard from "./cards/screen"
import SeriesCard from "./cards/series"
import SimilarCard from "./cards/similar"
import PlayedCard from "./cards/played"
import BookmarkedCard from "./cards/bookmarked"


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
