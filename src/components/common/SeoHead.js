import Head from "next/head"
import siteConfig from "../../config/siteConfig"

const DEFAULT_IMAGE = "/company-logo.webp"

function absoluteUrl(path = "") {
  if (!path) return siteConfig.site_url
  if (/^https?:\/\//i.test(path)) return path
  return `${siteConfig.site_url}${path.startsWith("/") ? path : `/${path}`}`
}

export default function SeoHead({
  title,
  description,
  canonicalPath,
  image = DEFAULT_IMAGE,
  type = "website",
}) {
  const canonicalUrl = absoluteUrl(canonicalPath || "")
  const imageUrl = absoluteUrl(image)

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} key="description" />
      <link rel="canonical" href={canonicalUrl} key="canonical" />

      <meta property="og:type" content={type} key="og:type" />
      <meta property="og:site_name" content={siteConfig.company_name} key="og:site_name" />
      <meta property="og:title" content={title} key="og:title" />
      <meta property="og:description" content={description} key="og:description" />
      <meta property="og:url" content={canonicalUrl} key="og:url" />
      <meta property="og:image" content={imageUrl} key="og:image" />

      <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
      <meta name="twitter:title" content={title} key="twitter:title" />
      <meta name="twitter:description" content={description} key="twitter:description" />
      <meta name="twitter:image" content={imageUrl} key="twitter:image" />
    </Head>
  )
}
