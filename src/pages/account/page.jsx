import Page from "@components/layouts/page"
import { Divider } from "@lib/ui/components"
import Profile from "./_components/profile"
import PlayedSection from "./_components/played-section"
import WatchlistSection from "./_components/watchlist-section"
import Lists from "./_components/lists"

import "./page.css"

export default function Account() {
  return (
    <Page className="gap-16" viewTransition>
      <Profile />
      <Divider />
      <PlayedSection />
      <Divider />
      <WatchlistSection />
      <Divider />
      <Lists />
    </Page>
  )
}
