// import { useEffect, useState } from "react"
import { Outlet, Link, useLocation, useParams } from "react-router-dom"
// import NewsSction from "@components/discover/news-section"
import RecommendSection from "@components/discover/recommend-section"

const intro_topics = [
  { href: "/search", tag: "Search", desc: "Find your next movie or tv show to watch" },
  { href: "/onscreen", tag: "In Theaters", desc: "Book Tickets for Movies in Theaters Near You" },
  // { href: "/discover/news", tag: "Series", desc: "Get the latest news and gossips" },
]


export default function Discover() {
  const { pathname } = useLocation()
  const { id } = useParams()
  let isNestedRoute

  if (pathname === "/discover/movies" || pathname === "/discover/series") {
    isNestedRoute = true
  } else if (id) {
    isNestedRoute = true
  }


  return (
    isNestedRoute ? (
      <Outlet />
    ) : (
      <div className="page discover-page">
        <section className="intro-section">
          {/* <h3>Explore Movies</h3> */}
          <div className="boxes">
            {intro_topics.map(elem => (
              <Link to={elem.href} key={elem.href}>
                <div className="box flex-col">
                  <p className="tag">{elem.tag}</p>
                  <p className="desc">{elem.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
        {/* <NewsSction /> */}
        <RecommendSection />
      </div>
    )
  )
}
