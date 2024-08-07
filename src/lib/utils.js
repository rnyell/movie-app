export async function request(path = "", params = {}) {
  const base = import.meta.env.VITE_MAIN_API_URL
  const url = new URL(path, base)
  Object.keys(params).forEach((param) =>
    url.searchParams.set(param, params[param])
  )

  try {
    const res = await fetch(url)
    const data = res.json()
    return data
  } catch (err) {
    console.log(err)
  }
}


export function readLocalStorage(key) {
  const value = localStorage.getItem(key) || null
  return JSON.parse(value)
}


export function writeLocalStorage(key, value) {
  if (typeof key === "string") {
    localStorage.setItem(key, JSON.stringify(value))
  } else {
    throw new Error("\"key\" must be a string")
  }
}


export function strCapitalizer(word) {
  return word
    .split(" ")
    .map(el => el.substring(0, 1).toUpperCase() + el.substring(1, el.length))
    .join(" ")
}


export function transformTitleToURL(title) {
  return title.trim().toLowerCase().replaceAll(" ", "-")
}


export const weekObjShort = {
  0: "Mon",
  1: "Tue",
  2: "Wed",
  3: "Thu",
  4: "Fri",
  5: "Sat",
  6: "Sun",
}

export const weekObj = {
  0: "Monday",
  1: "Tuesday",
  2: "Wednesday",
  3: "Thursday",
  4: "Friday",
  5: "Saturday",
  6: "Sunday",
}

export const monthObj = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
}


export function devideItemsIntoPages(page, array) {
  const ITEMS_PER_PAGE = 18
  let arg1 = (page - 1) * ITEMS_PER_PAGE
  let arg2 = ITEMS_PER_PAGE * page
  return array.slice(arg1, arg2)
}


export function generatePagination(currentPage, totalPages) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages]
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages]
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ]
}
