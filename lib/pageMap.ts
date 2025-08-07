// This is a simplified pageMap for Nextra 4
// In a real implementation, this would be generated from your content directory
export const pageMap = [
  {
    name: 'index',
    route: '/',
    children: [],
  },
  {
    name: 'docs',
    route: '/docs',
    children: [
      {
        name: 'index',
        route: '/docs',
      },
      {
        name: 'tutorial',
        route: '/docs/tutorial',
        children: [],
      },
      {
        name: 'concepts',
        route: '/docs/concepts',
        children: [],
      },
      {
        name: 'performance',
        route: '/docs/performance',
        children: [],
      },
      {
        name: 'advanced',
        route: '/docs/advanced',
        children: [],
      },
    ],
  },
  {
    name: 'blog',
    route: '/blog',
    children: [],
  },
  {
    name: 'changelog',
    route: '/changelog',
    children: [],
  },
  {
    name: 'about',
    route: '/about',
    children: [],
  },
]