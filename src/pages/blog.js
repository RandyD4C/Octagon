import { useEffect } from "react"
import PageHeader from "../components/common/PageHeader"
import SeoHead from "../components/common/SeoHead"

const SORO_BLOG_SCRIPT = "https://app.trysoro.com/api/embed/5cd62c4f-27ae-4d15-9a88-dff8eba80ec9"
const SORO_CACHE_WINDOW_MS = 5 * 60 * 1000

async function getSoroArticles() {
  try {
    const response = await fetch(SORO_BLOG_SCRIPT)
    const script = await response.text()
    const match = script.match(/var SORO_ARTICLES = (\[.*?\]);/s)

    return match ? JSON.parse(match[1]) : []
  } catch (error) {
    console.error("Unable to load Soro articles for SEO metadata:", error)
    return []
  }
}

export async function getServerSideProps({ query }) {
  const slug = typeof query.post === "string" ? query.post : ""
  const articles = slug ? await getSoroArticles() : []
  const article = articles.find((item) => item.slug === slug) || null

  return {
    props: {
      article,
    },
  }
}

export default function Blog({ article }) {
  useEffect(() => {
    const blogContainer = document.getElementById("soro-blog")
    if (blogContainer) {
      blogContainer.innerHTML = ""
    }

    const script = document.createElement("script")
    const cacheKey = Math.floor(Date.now() / SORO_CACHE_WINDOW_MS)
    script.src = `${SORO_BLOG_SCRIPT}?v=${cacheKey}`
    script.defer = true
    script.dataset.soroBlogEmbed = "true"
    document.body.appendChild(script)

    return () => {
      script.remove()
    }
  }, [])

  return (
    <div className="w-full">
      <SeoHead
        title={article?.title || "Manufacturing Blog | Octagon Precision Mold"}
        description={article?.excerpt || "Read Octagon Precision Mold articles on mold components, wire harness manufacturing, auto degating, injection molding spare parts, and OEM sourcing."}
        canonicalPath={article?.slug ? `/blog?post=${article.slug}` : "/blog"}
        image={article?.image || "/solutions/mold-components.webp"}
        type={article ? "article" : "website"}
      />
      <PageHeader title="Blog" />
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div id="soro-blog"></div>
      </div>
    </div>
  )
}
