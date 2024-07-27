import ViewTransition from "@lib/motion/view-transition"
import Page from "@components/layouts/page"
import { Divider } from "@src/lib/ui/components"
import PlayedHistory from "./_components/played-history"
import Watchlist from "./_components/watchlist"


export default function Account() {
  return (
    <ViewTransition>
      <Page pageName="account">
        <div>

        </div>

        <PlayedHistory />
        <Divider />
        <Watchlist />
      </Page>
    </ViewTransition>
  )
}
