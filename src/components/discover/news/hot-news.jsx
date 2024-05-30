import { useState } from "react"
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/outline"
import { FireIconSolid } from "@src/utils/icons"


export default function HotNews({ hotNews }) {
  const [index, setIndex] = useState(0)

  function showNextNews() {
    setIndex((index + 1) % hotNews.length)
  }

  function showPrevNews() {
    if (index - 1 === -1) {
      setIndex(hotNews.length - 1)
    } else {
      setIndex(index - 1)
    }
  }


  return (
    <div className="hot-news">
      <div className="news-card ::before-abs">
        <article>
          <header className="article-header align-center">
            <i className="icon fire-icon">
              <FireIconSolid />
            </i>
            <h6>Hot News</h6>
          </header>
          <figure className="article-img">
            <img src={hotNews[index].urlToImage} />
          </figure>
          <div className="article-body">
            <h5 className="title">{hotNews[index].title}</h5>
          </div>
        </article>
        <div className="cta">
          <div className="date">8 April</div>
          <span data-ml-auto />
          {(index !== 0) && (
            <i className="icon prev-icon" onClick={showPrevNews}>
              <ArrowLeftIcon />
            </i>
          )}
          <div>{index + 1}/{hotNews.length}</div>
          {(index !== hotNews.length - 1) && (
            <i className="icon" onClick={showNextNews}>
              <ArrowRightIcon />
            </i>
          )}
        </div>
      </div>
    </div>
  )
}
