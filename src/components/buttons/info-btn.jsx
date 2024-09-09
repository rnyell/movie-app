import { InfoIcon } from "@lib/ui/icons"
import { Button } from "@lib/ui/components"

export default function InfoButton({ setModal, ...props }) {
  const { variant, size, iconSize, className } = props

  return (
    <Button
      className={className}
      variant={variant}
      size={size}
      isSquare
      iconOnly
      iconSize={iconSize}
      svg={<InfoIcon />}
      onClick={() => setModal(true)}
    />
  )
}
