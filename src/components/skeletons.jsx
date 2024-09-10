import { motion } from "framer-motion"
import { useWindowOffsets } from "@lib/hooks"
import cn from "@lib/ui/cn"
import { Overlay } from "./movie-cards"

const shimmer = `
  overflow-hidden before:content-[''] before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-slate-400/15 before:to-transparent
`

export function Spinner({ className }) {
  return (
    <div className={cn("flex-center size-5", className)}>
      <svg className="animate-spin size-10/12 text-primary-200" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <circle className="text-primary-400" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
        <path className="text-primary-800" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    </div>
  )
}

const initialLoadingMotion = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.6,
    },
  },
  exit: {
    opacity: 0.25,
    transition: {
      delay: 1,
      duration: 1,
    },
  },
}


export function InitialLoading() {
  return (
    <motion.div className="h-screen" {...initialLoadingMotion}>
      <img
        className="w-full h-full grayscale-[55%] opacity-90"
        src="/vhs/gl1.gif"
      />
    </motion.div>
  )
}

export function AppLoading() {
  return (
    <motion.div>
      <div />
    </motion.div>
  )
}

export function HeroMovieSkeleton() {
  return (
    <div
      className={`${shimmer} relative h-full aspect-[var(--landscape-ratio)] bg-gray-700 rounded-5xl`}
    />
  )
}

export function SwiperSkeleton() {
  return (
    <div className="h-[480px] mt-4 p-5 col-span-full flex-col relative">
      <div className={`${shimmer} absolute inset-0 rounded-5xl`} />
      <div className="align-center gap-1.5 ml-auto">
        <div className="size-10 rounded-full bg-gray-800" />
        <div className="size-10 rounded-full bg-gray-800" />
      </div>
      <div className="mt-auto py-8 space-y-4">
        <div className="align-center gap-6">
          <div
            className={`${shimmer} relative w-16 h-8 bg-gray-700/25 rounded-full`}
          />
          <div
            className={`${shimmer} relative w-16 h-8 bg-gray-700/25 rounded-full`}
          />
        </div>
        <div
          className={`${shimmer} relative w-48 h-6 bg-gray-500/75 rounded-4xl`}
        />
        <div className="align-center gap-5">
          <div
            className={`${shimmer} relative w-12 h-3 bg-gray-700 rounded-4xl`}
          />
          <div
            className={`${shimmer} relative w-8 h-3 bg-yellow-500/50 rounded-sm`}
          />
        </div>
      </div>
      <div className="my-4 align-center gap-4">
        <div className="size-12 grow rounded-md bg-rose-500/35" />
        <div className="size-12 rounded-md bg-gray-300/35" />
        <div className="size-12 rounded-md bg-gray-300/35" />
      </div>
    </div>
  )
}

export function SelectedMovieSkeleton() {
  return (
    <div className="min-h-[90vh] relative flex-col">
      <div
        className={`${shimmer} absolute inset-0 bg-gradient-to-bl from-gray-600/50 to-[var(color-neutral-800)]`}
      />
      <div className="mt-auto py-6 px-14 space-y-8">
        <div
          className={`${shimmer} relative before:via-slate-300/50 w-48 h-8 bg-gray-400/50 rounded-2xl`}
        />
        <div className="!mt-4 align-center gap-6 [&>*]:rounded-xl">
          <div className={`${shimmer} relative w-16 h-6 bg-gray-500/50`} />
          <div className={`${shimmer} relative w-16 h-4 bg-gray-700/25`} />
          <div className={`${shimmer} relative w-16 h-4 bg-gray-700/25`} />
        </div>
        <div className="mt-10 space-y-2.5 [&>*]:rounded-4xl [&>*]:bg-gray-700">
          <p className="w-10/12 max-w-[690px] h-3" />
          <p className="w-11/12 max-w-[740px] h-3" />
          <p className="w-8/12 max-w-[620px] h-3" />
        </div>
        <div className="align-center gap-4 [&>*]:rounded-full">
          <div className="w-36 h-14 bg-rose-500/45" />
          <div className="size-14 bg-gray-300/45" />
          <div className="size-14 bg-gray-300/45" />
        </div>
      </div>
    </div>
  )
}

export function PrimaryOverlaySkeleton() {
  return (
    <Overlay.Container variant="primary" className={`${shimmer} absolute`}>
      <div className="h-4 w-24 rounded-lg bg-gray-100/45" />
      <div className="mt-4 align-center gap-4">
        <div className="h-3 w-10 rounded-lg bg-gray-300/45" />
        <div className="h-3 w-16 rounded-lg bg-gray-300/45" />
        <div className="size-4 rounded-md bg-gray-300/45" />
      </div>
      <div className="my-4 align-center gap-2 [&>*]:rounded-md">
        <div className="size-10 bg-rose-500/45" />
        <div className="size-10 bg-gray-300/45" />
        <div className="size-10 bg-gray-300/45" />
      </div>
    </Overlay.Container>
  )
}

export function SeriesOverlaySkeleton() {
  return (
    <Overlay.Container variant="series" className={`${shimmer} absolute`}>
      <div className="h-3.5 w-24 rounded-lg bg-gray-100/45" />
      <div className="my-4 align-center gap-2">
        <div className="h-10 w-10 rounded-md bg-rose-500/45" />
        <div className="h-10 w-10 rounded-md bg-gray-300/45" />
        <div className="h-10 w-10 rounded-md bg-gray-300/45" />
      </div>
    </Overlay.Container>
  )
}

export function CardSkeleton({ variant }) {
  switch (variant) {
    case "common": {
      return (
        <div
          className={`${shimmer} relative w-[clamp(245px,65vw,300px)] shrink-0 bg-primary-700 rounded-3xl`}
          style={{ aspectRatio: "var(--landscape-ratio)" }}
        />
      )
    }
    case "simple": {
      return (
        <div className={`${shimmer} relative aspect-[1.25] w-[clamp(200px,60vw,285px)] shrink-0 bg-primary-700 rounded-3xl`} />
      )
    }
    case "result": {
      return (
        <div className="space-y-2">
          <div className={cn(shimmer, "relative w-full bg-primary-700 rounded-3xl")} style={{ aspectRatio: "var(--portrait-ratio)" }} />
          <div className="align-center-col gap-2">
            <div className={cn(shimmer, "relative w-[95px] h-3 bg-primary-600 rounded-3xl")} />
            <div className={cn(shimmer, "relative w-10 h-2 bg-primary-800 rounded-3xl")} />
          </div>
        </div>
      )
    }
    case "bookmark": {
      return (
        <div
          className="w-[clamp(170px,40vw,195px)] shrink-0 bg-primary-700 rounded-3xl animate-pulse"
          style={{ aspectRatio: "var(--portrait-ratio)" }}
        />
      )
    }
  }
}

export function CardsSkeleton({ cardVariant }) {
  const { windowWidth: w } = useWindowOffsets()
  const count = w > 920 ? 6 : w > 720 ? 5 : w > 620 ? 4 : w > 420 ? 3 : 2
  /* i know, the readability is -zero- ... */

  return (
    <div className="p-4 overflow-hidden flex gap-6">
      {[...Array(count).keys()].map((_, i) => (
        <CardSkeleton variant={cardVariant} key={i} />
      ))}
    </div>
  )
}

export function DetailsModalSkeleton() {
  return (
    <div className="w-full">
      <div className={cn(shimmer, "relative w-full aspect-[var(--landscape-ratio)] rounded-4xl")}>
        <div className="absolute bottom-4 left-6">
          <div className="w-28 h-3.5 bg-gray-500 rounded-4xl" />
          <div className="w-32 h-2 mt-3 bg-zinc-700 rounded-xl" />
        </div>
      </div>
      <div className="p-6 mt-2 space-y-2">
        <div className="space-y-2.5 [&>*]:rounded-4xl [&>*]:bg-gray-700">
          <p className="w-10/12 h-2" />
          <p className="w-11/12 h-2" />
          <p className="w-8/12 h-2" />
        </div>
        <div className="w-48 h-2 !mt-6 bg-zinc-700 rounded-xl" />
        <div className="w-28 h-2 bg-zinc-700 rounded-xl" />
      </div>
    </div>
  )
}

export function ListsModalSkeleton({ count = 1 }) {
  return (
    <div className="px-2 align-center-col gap-4">
      {[...Array(count).keys()].map((_, i) => (
        <div className="w-full align-center gap-3" key={i}>
          <span className={cn(shimmer, "relative size-6 inline-block border border-solid border-primary-700 rounded")} />
          <div className={cn(shimmer, "relative w-20 h-3 bg-primary-700 rounded-2xl")} />
        </div>
      ))}
    </div>
  )
}
