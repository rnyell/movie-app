import { useEffect, useState } from "react"
import { StarIcon } from "@heroicons/outline"


export default function Rates({ variant }) {
  

  switch (variant) {
    case "sqaure": {
      return (
        <div className="rates" data-variant={variant}>

        </div>
      )
    }
    case "star": {
      return (
        <div className="rates" data-variant={variant}>

        </div>
      )
    }
    case "verbose": {
      return (
        <div className="rates" data-variant={variant}>
          <div className="rotten">
    
          </div>
        </div>
      )
    }
  }
}
