import { useState } from "react"
import { motion } from "framer-motion"
import { useThemeContext, useUserContext } from "@src/store"
import { AtSymbolIcon, CameraIcon } from "@heroicons/outline"
import { Avatar } from "@lib/ui/components"


export default function Profile() {
  const { isMobile } = useThemeContext()
  const { userState, setUserState } = useUserContext()
  const { id, username, fullName, avatarUrl, isAnonymous } = userState
  const [hover, setHover] = useState(false)


  return (
    <section>
      <div className="py-4 px-6 align-center gap-6">
        <motion.div
          className="overflow-hidden relative rounded-full"
          onHoverStart={() => setHover(true)}
          onHoverEnd={() => setHover(false)}
        >
          <Avatar className="size-20" src={avatarUrl} />
          <div className="py-[1px] w-full absolute-x-center bottom-0 justify-center translate-y-full bg-gray-700/75 cursor-pointer transition-transform data-[hover=true]:translate-y-0" data-hover={hover}>
            <CameraIcon className="size-5" />
          </div>
        </motion.div>
        <div className="flex-col gap-1">
          <p className="text-2xl font-extrabold text-primary-50">{fullName}</p>
          <p className="text-sm font-medium text-primary-400">
            {1 ? (
              <span className="inline-flex items-center">
                <AtSymbolIcon className="size-4 stroke-2" />
                {"YO"}
              </span>
            ) : "add a username!"}
          </p>
        </div>
      </div>
    </section>
  )
}
