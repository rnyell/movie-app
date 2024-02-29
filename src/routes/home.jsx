import { getTrendingMovies, discoverMovies } from "../utils/apis"
import SearchBox from "../components/search-box"

import "../components/styles/home.css"
import Header from "../components/header"
import Footer from "../components/footer"


export default function Home() {

  // getTrendingMovies()
  // discoverMovies()

  return (
    <main className="home">
      <Header />

      <SearchBox onHomePage={true} />

      <Footer />

    </main>
  )
}
