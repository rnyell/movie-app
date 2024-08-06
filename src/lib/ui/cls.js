// TODO
// cls(CSSModule, { base, size }, cs)
export default function cls(CSSModule, classNames = [], customStyles = "") {
  let styles = "";
  for (let cn of classNames) {
    styles += CSSModule[cn] + " "
  }

  if (customStyles.trim() !== "") {
    styles += customStyles
  }

  return styles
}
