import { ViewTransition } from "@lib/motion"
import Page from "@components/layouts/page"
import { Divider } from "@lib/ui/components"
import Profile from "./_components/profile"
import WatchHistory from "./_components/watch-history"
import Watchlist from "./_components/watchlist"
import Lists from "./_components/lists"

import "./page.css"


export default function Account() {
  return (
    <ViewTransition>
      <Page pageName="account">
        <Profile />
        <Divider />
        <WatchHistory />
        <Divider />
        <Watchlist />
        <Divider />
        <Lists />
      </Page>
    </ViewTransition>
  )
}
