import MovieList from "@components/movie/movie-list"
import SideNav from "../components/sidenav"
import Header from "../components/header"

export default function Discover() {
  return (
    <div className="discover">
      <SideNav />
      <main>
        <Header dataLocation="discover" />
        
      </main>
    </div>
  )
}
