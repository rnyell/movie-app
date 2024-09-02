import cn from "@lib/ui/cn"

export default function Page({ children, className }) {
  return (
    <div className={cn("pt-6 px-8 flex-col", className)}>
      {children}
    </div>
  )
}
