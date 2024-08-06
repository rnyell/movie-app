import Icon from "./icon"
import classes from "./button.module.css"
import cls from "../cls"


export default function Button({
  children,
  type = "button",
  variants = "solid-primary",
  size = "md",
  customStyles = "",
  iconOnly = false,
  iconSize = "md",
  iconFill,
  svg,
  iconCustomStyles = "",
  ...props
}) {

  return (
    <button
      className={cls(classes, ["button", variants, size], customStyles)}
      type={type}
      role="button"
      {...props}
    >
      {iconOnly ? (
        <Icon
          svg={svg}
          size={iconSize}
          fill={iconFill}
          customStyles={iconCustomStyles}
        />
      ) : 
        children
      }
    </button>
  )
}
