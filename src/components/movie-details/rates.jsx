import { getAdditionalDetails } from "@services"
import { formatRate } from "@services/movie-utils"
import { useLoader } from "@lib/hooks"
import { StarIcon } from "@heroicons/solid"
import {
  IMDBIcon,
  IMDB2Icon,
  RottenTomatoesIcon,
  RottenTomatoesGreenIcon,
  MetacriticIcon,
  PrimeVideoIcon
} from "@lib/ui/icons"

import cls from "@lib/ui/cls"
import classes from "./rates.module.css"


export default function Rates({
  extId,
  rate,
  variant,
  color,
  order = "normal",
  starSize = "icon-md",
  starSvg,
  customStyles,
  ...props
}) {
  const { data, isLoading } = useLoader(() => getAdditionalDetails(extId))

  switch (variant) {
    case "square": {
      return (
        <div
          className={cls(classes, ["rate", color], customStyles)}
          data-variant={variant}
          {...props}
        >
          <span className={classes.number}>{formatRate(rate)}</span>
        </div>
      )
    }
    case "star": {
      return (
        <div
          className={cls(classes, ["rate", color, order], customStyles)}
          data-variant={variant}
          {...props}
        >
          <i className={`icon ${classes.icon} ${starSize}`}>
            {starSvg ? starSvg : <StarIcon />}
          </i>
          <span className={classes.number}>{formatRate(rate)}</span>
        </div>
      )
    }
    case "verbose": {
      if (isLoading) {
        return <div className="w-full h-20" />
      }

      const variable = [
        { tag: 'imdb', icon1: <IMDBIcon />, icon2: <IMDB2Icon /> },
        { tag: 'rotten', icon1: <RottenTomatoesIcon />, icon2: <RottenTomatoesGreenIcon /> },
        { tag: 'metacritic', icon1: <MetacriticIcon />, icon2: <PrimeVideoIcon /> }
      ]

      return (
        <div
          className={cls(classes, ["rate"], customStyles)}
          data-variant={variant}
          {...props}
        >
          {data?.Ratings?.map((rate, idx) => (
            <div className={classes.box} key={idx}>
              <span>{rate.Value}</span>
              <i className={`${classes[variable[idx].tag]} icon`}>
                {variable[idx].icon1}
              </i>
            </div>
          ))}
        </div>
      )
    }
  }
}
