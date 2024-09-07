import cn from "../cn"

export default function Avatar({
  src,
  name,
  withFallback = true,
  fallback = "name",
  status = false,
  className,
  ...rest
}) {
  // fallback: "name" | "image"
  return (
    <div
      className={cn(
        "size-9 shrink-0 relative outline outline-[1.5] outline-primary-600 outline-offset-2 rounded-full",
        className
      )}
      {...rest}
    >
      <img className="w-100 rounded-full" src={src} alt={name ?? ""} />
      {/* {withFallback && <span />} */}
      {status && (
        <span className="size-[5.75px] absolute bottom-[1.5px] right-[1.5px] bg-[greenyellow] outline outline-[3] outline-primary-900 rounded-full" />
      )}
      <div />
    </div>
  )
}
