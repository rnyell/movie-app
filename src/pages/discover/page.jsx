import { Link } from "react-router-dom"
import { ViewTransition } from "@lib/motion"
import Page from "@components/layouts/page"
import RecommendSection from "./_components/recommend-section"

import "./page.css"

const intro_topics = [
  {
    href: "/search",
    tag: "Search",
    desc: "Find your next movie or tv show to watch"
  },
  {
    href: "/onscreen",
    tag: "In Theaters",
    desc: "Book Tickets for Movies in Theaters Near You"
  },
]


export default function Discover() {
  return (
    <ViewTransition>
      <Page pageName="discover-page">
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
      </Page>
    </ViewTransition>
  )
}
