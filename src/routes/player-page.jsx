import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { HeartIcon, ChevronLeftIcon, SpeakerWaveIcon } from "@heroicons/outline"
import { PlayIcon, PauseIcon } from "@heroicons/solid"
import { Backward10Icon, Forward10Icon } from "@src/utils/icons"


export default function PlayerPage() {
  const location = useLocation()
  const {id, media, prevUrl} = location.state

  return (
    <div className="player-page">
      <div className="player">
        <img src="/vhs/blue1.gif" className="placerholder" />
        <div className="topbar">
          <i className="icon">
            <HeartIcon />
          </i>
        </div>
        <div className="bottombar">
          <div className="progressbar" />
          <div className="controls">
            <i className="icon">
              <Forward10Icon />
            </i>
            <i className="icon">
              <PlayIcon />
            </i>
            <i className="icon">
              <Backward10Icon />
            </i>
          </div>
        </div>
      </div>
    </div>
  )
}
