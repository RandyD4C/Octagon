import Head from "next/head"
import { useEffect } from "react"
import PageHeader from "../components/common/PageHeader"

const SORO_BLOG_SCRIPT = "https://app.trysoro.com/api/embed/5cd62c4f-27ae-4d15-9a88-dff8eba80ec9"
const SORO_CACHE_WINDOW_MS = 5 * 60 * 1000

export default function Blog() {
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
      <Head>
        <title>Blog | Octagon Precision Mold</title>
        <meta
          name="description"
          content="Read the latest Octagon Precision Mold blog posts and manufacturing insights."
          key="description"
        />
      </Head>
      <PageHeader title="Blog" />
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div id="soro-blog"></div>
      </div>
    </div>
  )
}
