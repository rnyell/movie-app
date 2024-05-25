import { IMAGES_URL } from "@utils/apis"

const logos_variants = {
  "Netflix": "transparent",
  "Hulu": "transparent",
  "HBO": "white",
  "Apple TV+": "white"
}


export default function NetworkLogo({ networks }) {
  const {name, logo_path} = networks[0]
  const backgroundColor = logos_variants[name]

  return (
    <div className="network flex-center" style={{backgroundColor}}>
      <img className="network-logo" src={`${IMAGES_URL}w500${logo_path}`} alt="network logo" />
    </div>
  )
}
