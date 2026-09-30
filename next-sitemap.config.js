/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.SITE_URL || "https://loro.dev",

  generateRobotsTxt: true, // (optional)

  // API-reference helpers are components, never indexable pages.
  exclude: ["/docs/api/indent", "/docs/api/method"],
};
