declare global {
  interface Window {
    clarity?: (eventType: string, eventName: string) => void;
  }
}

export {};

declare module "*.mdx" {
  let MDXComponent: (props: unknown) => JSX.Element;
  export default MDXComponent;
}
