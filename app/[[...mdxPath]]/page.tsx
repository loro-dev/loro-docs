import { evalutePage, fetchPageMap } from 'nextra/page-map'
import { notFound } from 'next/navigation'

export const revalidate = 60

type Params = Promise<{
  mdxPath?: string[]
}>

export async function generateStaticParams() {
  const pageMap = await fetchPageMap()
  const paths = []
  
  function extractPaths(items: any[], prefix = '') {
    for (const item of items) {
      if (item.type === 'page' || item.type === 'mdx') {
        const path = prefix ? `${prefix}/${item.name}` : item.name
        paths.push(path.split('/'))
      }
      if (item.children) {
        extractPaths(item.children, prefix ? `${prefix}/${item.name}` : item.name)
      }
    }
  }
  
  extractPaths(pageMap)
  
  return paths.map(mdxPath => ({ mdxPath }))
}

export default async function Page({ params }: { params: Params }) {
  const { mdxPath } = await params
  const route = mdxPath?.join('/') || ''
  const filePath = route ? `/${route}` : '/index'
  
  try {
    const page = await evalutePage({ filePath, pageMap: await fetchPageMap() })
    
    if (!page) {
      notFound()
    }
    
    return page
  } catch (error) {
    console.error('Error rendering page:', error)
    notFound()
  }
}