export async function getSomeNews() {
  // const path1 = "https://newsapi.org/v2/top-headlines"
  const path = "https://newsapi.org/v2/everything"
  const keywords = "(movie film upcoming cinema oscar drama marvel dune) OR (box AND office) OR (screen AND talk) OR (movie AND 2024) OR (movie AND 2025)"
  // const keywords = "Ryan Gosling Emma Stone"
  const params = {
    q: keywords,
    sortBy: "popularity",
    domains: "collider.com,variety.com,comingsoon.net,rottentomatoes.com",
    from: "2024-03-25",
    to: "2024-04-07",
    apiKey: import.meta.env.VITE_NEWS_API_KEY,
  }
  const data = await request(path, params)
  const {articles} = data
  return articles
}
