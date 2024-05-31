import { useState, useEffect, useRef } from "react"
import { Link, useLocation } from "react-router-dom"
import { HeartIcon, ChevronLeftIcon, SpeakerWaveIcon, SpeakerXMarkIcon, ShareIcon, ArrowPathIcon } from "@heroicons/outline"
import { PlayIcon, PauseIcon, ForwardIcon, BackwardIcon, ArrowDownTrayIcon, LanguageIcon } from "@heroicons/solid"
import { IMAGES_URL } from "@services"
import { useMediaDetails } from "@services/hooks"


export default function PlayerPage() {
  const videoRef = useRef(null)
  const location = useLocation()
  const {id, media} = location.state
  const {isLoading, mediaDetails} = useMediaDetails(media, id)

  const {title, backdrop_path} = mediaDetails


  return (
    <div className="player-page">
      <div className="player">
        {/* <video controls>
          <source src="/" />
        </video> */}
        <img className="video-placeholder" src="/vhs/blue1.gif" />
        <div className="topbar align-center">
          <Link className="btn" to={-1}>
            <i className="icon back-icon">
              <ChevronLeftIcon />
            </i>
          </Link>
          <h4 className="title">{title}</h4>
          <i className="icon fave-icon">
            <HeartIcon />
          </i>
          <i className="icon dl-icon">
            <ArrowDownTrayIcon />
          </i>
          <i className="icon share-icon">
            <ShareIcon />
          </i>
        </div>
        <div className="bottombar flex-col-center">
          <div className="progressbar" />
          <div className="action-btns flex-center w-100">
            <i className="empty"></i>
            <div className="controls flex">
              <i className="icon bfw-icon bw-icon">
                <BackwardIcon />
              </i>
              <i className="icon play-icon">
                <PlayIcon />
              </i>
              <i className="icon bfw-icon fw-icon">
                <ForwardIcon />
              </i>
            </div>
            <i className="icon speaker-icon">
              <SpeakerWaveIcon />
            </i>
          </div>
        </div>
      </div>
    </div>
  )
}
