import { useEffect, useState } from "react"

import { getComingMovies, getOnScreenMovies } from "@src/utils/apis"
import SearchBox from "@components/search-box"
import Header from "@components/header"
import HeroSection from "@components/home/hero-section"
import ScreenSection from "../components/movie/screen-section"
// import Footer from "@components/footer"

import "@styles/home.css"


export default function Home() {
  useEffect(() => {

  }, [])

  
  return (
    <main className="home-page">
      <Header isHomePage={true}>
        <SearchBox isHomePage={true} />
      </Header>
      <HeroSection />
      <ScreenSection />

      <div className="background-effect"></div>
    </main>
  )
}
