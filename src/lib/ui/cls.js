export default function cls(classes, props = []) {
  let classNames = "";
  for (let prop of props) {
    classNames += classes[prop] + " "
  }

  return classNames
}
