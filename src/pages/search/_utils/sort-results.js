export default function sortResults(unsortedResults, sortby, order) {
  let sortedResults

  if (sortby === "none") {
    return unsortedResults
  }

  if (sortby === "popularity" || sortby === "vote_average") {
    if (order === "desc") {
      sortedResults = unsortedResults.toSorted(
        (a, b) => b[sortby] - a[sortby]
      )
    } else {
      sortedResults = unsortedResults.toSorted(
        (a, b) => a[sortby] - b[sortby]
      )
    }
  }

  // if (sortby === "title") {
  //   if (order === "desc") {
  //     sortedResults = unsortedResults.toSorted(
  //       (a, b) => b[sortby].localeCompare(a[sortby])
  //     )
  //   } else {
  //     sortedResults = unsortedResults.toSorted(
  //       (a, b) => a[sortby].localeCompare(b[sortby])
  //     )
  //   }
  // }

  return sortedResults
}
