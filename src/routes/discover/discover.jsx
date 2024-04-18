import { useEffect, useState } from "react"
import { Link, Outlet, useLocation } from "react-router-dom"

import NewsSction from "@components/discover/news-section"
import RecommendedSection from "@components/discover/recommended-section"
import MovieList from "@components/movie/movie-list"
import MovieCard from "@components/movie/movie-card"

const intro_topics = [
  { href: "/search", tag: "Search" },
  { href: "/discover/movies", tag: "Movies" },
  { href: "/discover/series", tag: "Series" },
  { href: "/discover/news", tag: "News" },
]

export default function Discover() {
  const { pathname } = useLocation()
  const isNestedRoute = pathname === "/discover/movies" || pathname === "/discover/series"
  
  return (
    <div className="discover-page">
      {isNestedRoute ? <Outlet /> :
        <>
          <section className="intro-section">
            <div className="container">
              <p className="intro-text">Explore ...</p>
              <div className="wrapper">
                {intro_topics.map(elem => (
                  <Link to={elem.href}>
                    <div className="box flex-col">
                      <p>{elem.tag}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
          <NewsSction />
          <RecommendedSection />
        </>
      }
    </div>
  )
}
