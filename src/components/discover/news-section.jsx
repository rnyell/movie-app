import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useNewsService } from "@services/hooks"
import HotNews from "./news/hot-news"
import LatestNews from "./news/latest-news"


export default function NewsSction() {
  const {isLoading, news} = useNewsService()
  const hotNews = isLoading ? [] : news.slice(0, 5)
  const latestNews = isLoading ? [] : news.slice(5, 10)


  if (isLoading) {
    return null
  }

  return (
    <section className="news-section">
      <header>
        <h3>Highlights</h3>
      </header>
      <div className="news-container">
        <LatestNews latestNews={latestNews} />
        <HotNews hotNews={hotNews} />
      </div>
      <div className="flex">
        <Link to="/discover/news">
          Read more news!
        </Link>
      </div>
    </section>
  )
}
