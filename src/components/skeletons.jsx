import { motion } from "framer-motion"

const initialLoadingVariants = {
  initial: {
    opacity: 1
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.6
    }
  },
  exit: {
    opacity: 0.25,
    transition: {
      delay: 1,
      duration: 1,
    }
  }
}

const mainLoadingVariants = {
  initial: {

  },
  animate: {

  },
  exit: {

  }
}

export function InitialLoading() {
  return (
    <motion.div
      className="initial-loading"
      variants={initialLoadingVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <img src="/vhs/gl1.gif" />
    </motion.div>
  )
}

export function AppLoading() {
  return (
    <motion.div
      className="main-loading"
      // variants={mainLoadingVariants}
      // initial="initial"
      // animate="animate"
      // exit="exit"
    >
      <div />
    </motion.div>
  )
}

export function HomePageSkeleton() {
  return (
    <div className="home-page-skeleton">
      <div className="l-sidenav">
        <div className="l-sidenav-item"></div>
        <div className="l-sidenav-item"></div>
        <div className="l-sidenav-item"></div>
        <div className="l-sidenav-item"></div>
      </div>
      <div className="l-main">
        <div className="l-hero">
          <div className="l-hero-poster"></div>
          <div className="l-hero-carousel">
          <div className="l-hero-carousel-img"></div>
          <div className="l-hero-carousel-img"></div>
          <div className="l-hero-carousel-img"></div>
          </div>
        </div>
        <div className="l-section">
          <div className="l-section-movie"></div>
          <div className="l-section-movie"></div>
          <div className="l-section-movie"></div>
        </div>
      </div>
    </div>
  )
}

export function HeroMovieSkeleton() {
  return (
    <div className="hero-movie-skeleton">

    </div>
  )
}

export function PortraitCardLoading() {
  return (
    <div className="portrait-card-loading"></div>
  )
}

export function SelectedMovieSkeleton() {
  return (
    <div className="selected-movie-skeleton">
      <div className="l-poster"></div>
      <div className="l-attr">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="l-title"></div>
      <div className="l-overview">
        <p className="l-lines"></p>
        <p className="l-lines"></p>
        <p className="l-lines"></p>
      </div>
      <div className="l-casts">
        <div className="l-img"></div>
        <div className="l-img"></div>
        <div className="l-img"></div>
      </div>
    </div>
  )
}

export function SearchResultsSkeleton() {
  return (
    <div className="search-results-skeleton">
      {[...Array(12).keys()].map((_, i) => (
          <div className="movie-card-skeleton" key={i}>
            <div className="l-poster"></div>
            <div className="l-title"></div>
            <div className="l-release-date"></div>
          </div>
        ))
      }
    </div>
  )
}
