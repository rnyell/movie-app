import { getTrendingMovies, discoverMovies } from "@src/utils/apis"
import SearchBox from "@src/components/search-box"
import Header from "@src/components/header"
import Footer from "@src/components/footer"

import "@styles/home.css"


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
