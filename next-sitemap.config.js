/** @type {import('next-sitemap').IConfig} */
const SORO_BLOG_SCRIPT = 'https://app.trysoro.com/api/embed/5cd62c4f-27ae-4d15-9a88-dff8eba80ec9'

async function getSoroBlogPaths() {
  try {
    const response = await fetch(SORO_BLOG_SCRIPT)
    const script = await response.text()
    const match = script.match(/var SORO_ARTICLES = (\[.*?\]);/s)
    const articles = match ? JSON.parse(match[1]) : []

    return articles.map((article) => ({
      loc: `/blog?post=${encodeURIComponent(article.slug)}`,
      lastmod: article.isoDate,
      changefreq: 'weekly',
      priority: 0.6,
    }))
  } catch (error) {
    console.warn('Unable to add Soro blog posts to sitemap:', error)
    return []
  }
}

module.exports = {
  siteUrl: 'https://octagon-mold.com.my',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  autoLastmod: true,
  exclude: ['/api/*', '/backend/*'],
  additionalPaths: async () => getSoroBlogPaths(),
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/backend/'],
      },
    ],
  },
}
