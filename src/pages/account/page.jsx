import { ViewTransition } from "@lib/motion"
import Page from "@components/layouts/page"
import { Divider } from "@lib/ui/components"
import Profile from "./_components/profile"
import PlayedSection from "./_components/played-section"
import WatchlistSection from "./_components/WatchlistSection-section"
import Lists from "./_components/lists"

import "./page.css"

export default function Account() {
  return (
    <ViewTransition>
      <Page className="gap-16">
        <Profile />
        <Divider />
        <PlayedSection />
        <Divider />
        <WatchlistSection />
        <Divider />
        <Lists />
      </Page>
    </ViewTransition>
  )
}
