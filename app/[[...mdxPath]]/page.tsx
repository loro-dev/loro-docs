import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return [
    { mdxPath: [] },
    { mdxPath: ['about'] },
    { mdxPath: ['blog'] },
    { mdxPath: ['changelog'] },
    { mdxPath: ['docs'] },
    // Add more routes as needed
  ]
}

export default async function Page({
  params
}: {
  params: Promise<{ mdxPath?: string[] }>
}) {
  const { mdxPath } = await params
  const pagePath = mdxPath?.length ? mdxPath.join('/') : 'index'
  
  try {
    // Dynamically import the MDX content based on the path
    const MDXContent = await import(`../../content/${pagePath}.mdx`)
      .catch(() => import(`../../content/${pagePath}/index.mdx`))
      .catch(() => null)
    
    if (!MDXContent) {
      notFound()
    }
    
    return <MDXContent.default />
  } catch (error) {
    console.error('Page not found:', pagePath, error)
    notFound()
  }
}