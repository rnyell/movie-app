import { useEffect, useState } from "react"
import { Link, Outlet, useLocation } from "react-router-dom"
import NewsSction from "@components/discover/news-section"
import RecommendedSection from "@components/discover/recommended-section"
import GenreList from "@components/movie/genre-list"

const intro_topics = [
  { href: "/search", tag: "Search", desc: "Find your next movie or tv show to watch" },
  { href: "/onscreen", tag: "In Theaters", desc: "Book Tickets for Movies in Theaters Near You" },
  // { href: "/discover/news", tag: "Series", desc: "Get the latest news and gossips" },
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
              {/* <p className="intro-text">Explore ...</p> */}
              <div className="wrapper">
                {intro_topics.map(elem => (
                  <Link to={elem.href} key={elem.href}>
                    <div className="box flex-col">
                      <p className="tag">{elem.tag}</p>
                      <p className="desc">{elem.desc}</p>
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
