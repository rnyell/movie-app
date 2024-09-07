import cn from "@lib/ui/cn"

export default function Page({ children, className }) {
  return (
    <div className={cn("pt-6 pb-4 px-8 flex-col", className)}>
      {children}
    </div>
  )
}
