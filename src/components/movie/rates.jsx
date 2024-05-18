import { useEffect, useState } from "react"
import { StarIcon } from "@heroicons/outline"
import {
  IMDBIcon,
  IMDB2Icon,
  RottenTomatoesIcon,
  RottenTomatoesGreenIcon,
  MetacriticIcon,
  PrimeVideoIcon
} from "@utils/icons"
import { formatRate } from "@utils/utils"
import { getAdditionalDetails } from "@utils/apis"


export default function Rates({ id, rate, variant }) {
  const [ratings, setRatings] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadRates()
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
        <div className="rate flex-center" data-variant={variant}>
          <span className="rate-number">{formatRate(rate)}</span>
        </div>
      )
    }
    case "star": {
      return (
        <div className="rate" data-variant={variant}>
          <i className="icon"><StarIcon /></i>
          <span className="rate-number">{formatRate(rate)}</span>
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
