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

export function formatLongNumber(num, precision = 2) {
  const units = [
    { suffix: " T", threshold: 1e12 },
    { suffix: " B", threshold: 1e9 },
    { suffix: " M", threshold: 1e6 },
    { suffix: " K", threshold: 1e3 },
    { suffix: "", threshold: 1 },
  ]

  const found = units.find(unit => Math.abs(num) >= unit.threshold)

  if (found) {
    const d = num / found.threshold
    const fixed = Number.isInteger(d) ? d : d.toFixed(precision)
    return fixed + found.suffix
  } else {
    return num
  }
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
