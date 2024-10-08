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
import cn from "@lib/ui/cn"
import classes from "./rates.module.css"


export default function Rates({
  extId,
  rate,
  variant,
  color,
  order = "normal",
  starSize = "icon-md",
  starSvg,
  className,
  ...rest
}) {
  const { data, isLoading } = useLoader(getRates)

  async function getRates() {
    if (variant === "verbose") {
      const data = await getAdditionalDetails(extId)
      return data
    }
  }

  switch (variant) {
    case "square": {
      return (
        <div
          className={cn(classes.rate, classes[color], className)}
          data-variant={variant}
          {...rest}
        >
          <span className={classes.number}>{formatRate(rate)}</span>
        </div>
      )
    }
    case "star": {
      return (
        <div
          className={cn(classes.rate, classes[color], classes[order], className)}
          data-variant={variant}
          {...rest}
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

      const iconsSet = [
        { tag: 'imdb', icon1: <IMDBIcon />, icon2: <IMDB2Icon /> },
        { tag: 'rotten', icon1: <RottenTomatoesIcon />, icon2: <RottenTomatoesGreenIcon /> },
        { tag: 'metacritic', icon1: <MetacriticIcon />, icon2: <PrimeVideoIcon /> }
      ]

      return (
        <div
          className={cn(classes.rate, className)}
          data-variant={variant}
          {...rest}
        >
          {data?.Ratings?.map((rate, idx) => (
            <div className={classes.box} key={idx}>
              <i className={`${classes[iconsSet[idx].tag]} icon`}>
                {iconsSet[idx].icon1}
              </i>
              <span>{rate.Value}</span>
            </div>
          ))}
        </div>
      )
    }
  }
}
