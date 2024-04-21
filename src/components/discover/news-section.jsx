import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/outline"
import { FireIconSolid } from "@src/utils/icons"
import { getSomeNews } from "@utils/apis"

export default function NewsSction() {
  const [news, setNews] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [description, setDescription] = useState(false)
  

  useEffect(() => {
    // loadData()
  }, [])
  
  async function loadData() {
    const data = await getSomeNews()
    setNews(data)
    setIsLoading(false)
  }


  return (
    <section className="news-section">
      <header>
        <h3>Highlights</h3>
      </header>

      <div className="news-container">
        <div className="latest-news">
          <article>
            <figure className="article-img">
              <img src="https://static1.srcdn.com/wordpress/wp-content/uploads/2024/03/tony-stark-suiting-up-as-iron-man-in-iron-man.jpg?q=49&fit=crop&w=680&h=400&dpr=2" />
            </figure>
            <div className="article-body">
              <h5 className="title">Robert Downey Jr. Opens Up On Potential MCU Return As Iron Man: "It&#x2019;s Too Integral A Part Of My DNA"</h5>
              <p className="description">Despite his major ending in Avengers: Endgame, Robert Downey Jr. is more than game to return to the Marvel Cinematic Universe as Tony Stark/Iron Man.</p>
            </div>
          </article>
          <div className="side-news flex-col-y-center ::before-abs">
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, aperiam?</div>
            <div>Adipisicing elit. Vitae, ad reiciendis voluptatem itaque labore rerum quis aut minima deserunt suscipit eum iusto voluptatibus tempora similique!</div>
            <div>Lorem ipsum dolor sit amet.</div>
          </div>
        </div>

        <div className="hot-news">
          <div className="news-card ::before-abs">
            <article>
              <header className="article-header flex-y-center">
                <i className="icon fire-icon">
                  <FireIconSolid />
                </i>
                <h6>Hot News</h6>
              </header>
              <figure className="article-img">
                <img src="https://static1.colliderimages.com/wordpress/wp-content/uploads/2024/02/duneparttwo1.jpg?q=70&fit=contain&w=1140&h=&dpr=2" />
              </figure>
              <div className="article-body">
                <h5 className="title">&#x2018;Dune: Part Two&#x2019; Is Unstoppable as it Destroys New Global Box Office Milestone</h5>
              </div>
            </article>

            <div className="cta">
              <div className="date">8 April</div>
              {/* <i className="icon"><ArrowLeftIcon /></i> */}
              <div>1/5</div>
              <i className="icon"><ArrowRightIcon /></i>
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <Link to="/discover/news">
          Read more news!
        </Link>
      </div>
    </section>
  )
}
