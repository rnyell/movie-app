import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/outline"


export default function LatestNews({ latestNews }) {
  const [index, setIndex] = useState(0)

  function showNextNews() {
    setIndex((index + 1) % latestNews.length)
  }

  function showPrevNews() {
    if (index - 1 === -1) {
      setIndex(latestNews.length - 1)
    } else {
      setIndex(index - 1)
    }
  }


  return (
    <div className="latest-news">
      <div className="articles flex">
        <article className="flex-item w-100">
          <figure className="article-img">
            <img src={latestNews[index]?.urlToImage} />
            <div className="btns justify-center">
              <button className="btn prev-btn" onClick={showPrevNews}>
                <i className="icon">
                  <ArrowLeftIcon />
                </i>
              </button>
              <button className="btn" onClick={showNextNews}>
                <i className="icon">
                  <ArrowRightIcon />
                </i>
              </button>
            </div>
          </figure>
          <div className="article-body">
            <Link>
              <h5 className="title box-clamp">{latestNews[index]?.title}</h5>
            </Link>
            <p className="description box-clamp">{latestNews[index]?.description}</p>
          </div>
        </article>
      </div>
    </div>
  )
}
