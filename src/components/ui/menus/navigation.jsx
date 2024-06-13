import { useWindowOffsets } from "@src/utils/hooks"
import SideNav from "./sidenav"
import Menu from "./menu"

const breakpoints = {
  xs: 460,
  sm: 520,
  md: 760,
  lg: 1300,
  xl: 1540,
}


export default function Navigation() {
  const {windowWidth} = useWindowOffsets()
  const isSmallScreen = windowWidth <= breakpoints.sm

  if (isSmallScreen) {
    return <Menu />
  } else {
    return <SideNav />
  }
}
