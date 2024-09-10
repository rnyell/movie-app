import cn from "../cn"

// TODO &bull;
export default function Dot({ scale = "1.4", className }) {
  const styles = { scale: scale }

  return (
    <i
      className={cn(
        "-mt-[1px] inline-block text-primary-300",
        className
      )}
      style={styles}
    >&#x2022;</i>
  )
}
