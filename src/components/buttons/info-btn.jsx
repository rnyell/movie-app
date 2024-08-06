import { InfoIcon } from "@lib/ui/icons"
import { Button } from "@lib/ui/components"

export default function InfoButton({ setModal, ...props }) {
  const { variants, size, iconSize, customStyles } = props

  return (
    <Button
      variants={variants}
      size={size}
      customStyles={customStyles}
      iconOnly
      iconSize={iconSize}
      svg={<InfoIcon />}
      onClick={() => setModal(true)}
    />
  )
}
