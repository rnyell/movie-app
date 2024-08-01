export default function Page({ children, pageName }) {
  return (
    <div className={`page ${pageName}`}>
      {children}
    </div>
  )
}
