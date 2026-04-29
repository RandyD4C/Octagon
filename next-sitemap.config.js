/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://octagon-mold.com.my',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  autoLastmod: true,
  exclude: ['/api/*', '/backend/*'],
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
