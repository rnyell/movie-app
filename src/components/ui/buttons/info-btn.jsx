import { InfoIcon } from "@lib/icons"
import { Button } from "@src/lib/ui/components"

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
