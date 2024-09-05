import { ViewTransition } from "@lib/motion"
import Page from "@components/layouts/page"
import RecommendSection from "./_components/recommend-section"

import "./page.css"


export default function Discover() {
  return (
    <ViewTransition>
      <Page className="discover-page gap-16">
        <RecommendSection />
      </Page>
    </ViewTransition>
  )
}
