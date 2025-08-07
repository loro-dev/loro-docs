import nextra from "nextra";

const withNextra = nextra({});

export default withNextra({
    webpack(config, { isServer, dev }) {
      // Use the client static directory in the server bundle and prod mode
      // Fixes `Error occurred prerendering page "/"`
      config.output.webassemblyModuleFilename =
        isServer && !dev
          ? "../static/wasm/[modulehash].wasm"
          : "static/wasm/[modulehash].wasm";

      // Since Webpack 5 doesn't enable WebAssembly by default, we should do it manually
      config.experiments = { ...config.experiments, asyncWebAssembly: true };
      
      // =========================================================================
      // SVG handling
      // Find and modify the existing rule that handles SVG imports
      const fileLoaderRule = config.module.rules.find((rule) => {
        const test = rule.test;
        if (!test) return false;
        if (test.source) return test.source.includes('svg');
        if (test instanceof RegExp) return test.test('.svg');
        return false;
      });

      if (fileLoaderRule) {
        // Exclude SVG from the file loader
        fileLoaderRule.exclude = /\.svg$/;
      }

      // Add SVGR loader for SVG files
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });
      return config;
    },
  async redirects() {
    return [
      {
        source: "/discord",
        destination: "https://discord.gg/tUsBSVfqzf",
        permanent: false,
      },
      {
        source: '/blog/loro-open-source',
        destination: '/blog/loro-now-open-source',
        permanent: true,
      },
      {
        source: '/docs/advanced/replayable_event_graph',
        destination: '/docs/advanced/event_graph_walker',
        permanent: true,
      },
    ]
  },
})
