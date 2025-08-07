import { useMDXComponents as useDocsMDXComponents } from 'nextra-theme-docs'

export function useMDXComponents(components: any) {
  const docsComponents = useDocsMDXComponents()
  return {
    ...docsComponents,
    ...components
  }
}