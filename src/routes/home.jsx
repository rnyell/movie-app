import { useEffect } from "react"
import SearchBox from "@components/search-box"
import Header from "@components/header"
import HeroSection from "@components/home/hero-section"
// import Footer from "@components/footer"

import "@styles/home.css"


export default function Home() {
  useEffect(() => {
    
  }, [])

  return (
    <main className="home-page">
      <Header onHomePage={true}>
        <SearchBox onHomePage={true} />
      </Header>
      <HeroSection />

      {/* <Footer /> */}
    </main>
  )
}
