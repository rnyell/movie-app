import { useEffect, useState } from "react"
import { StarIcon } from "@heroicons/solid"
import {
  IMDBIcon,
  IMDB2Icon,
  RottenTomatoesIcon,
  RottenTomatoesGreenIcon,
  MetacriticIcon,
  PrimeVideoIcon
} from "@utils/icons"
import { getAdditionalDetails } from "@services"
import { formatRate } from "@services/movie-utils"


export default function Rates({ id, rate, variant }) {
  const [ratings, setRatings] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (variant === "verbose") {
      loadRates()
    }
  }, [])
  
  // const [
    //   {Value: imdb},
    //   {Value: rotten},
    //   {Value: metacritic},
  // ] = ratings  /*? destructureing problem */
  // console.log(ratings)

  async function loadRates() {
    const {ratings} = await getAdditionalDetails(id)
    setRatings(ratings)
    setIsLoading(false)
  }


  switch (variant) {
    case "square": {
      return (
        <div className="rate flex-center unselectable" data-variant={variant}>
          <span className="rate-number">{formatRate(rate)}</span>
        </div>
      )
    }
    case "star": {
      return (
        <div className="rate align-center unselectable" data-variant={variant}>
          <span className="rate-number">{formatRate(rate)}</span>
          <i className="icon">
            <StarIcon />
          </i>
        </div>
      )
    }
    case "verbose": {
      if (isLoading) {
        return <div>loading...</div>
      }

      return (
        <div className="rates flex" data-variant={variant}>
          <div className="box align-center-col imdb">
            <span>{ratings[0].Value}</span>
            <i className="icon imdb-icon" title="IMDb rate">
              <IMDBIcon />
              {/* <IMDB2Icon /> */}
            </i>
          </div>
          <div className="box align-center-col rotten">
            <span>{ratings[1].Value}</span>
            <i className="icon rotten-icon" title="Rotten Tomatoes rate">
              <RottenTomatoesIcon />
              {/* <RottenTomatoesGreenIcon /> */}
            </i>
          </div>
          <div className="box align-center-col metacritic">
            <span>{ratings[2].Value}</span>
            <i className="icon metacritic-icon" title="Metacritic rate">
              {/* <PrimeVideoIcon /> */}
              <MetacriticIcon />
            </i>
          </div>
        </div>
      )
    }
  }
}
