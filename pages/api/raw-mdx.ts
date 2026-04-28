import type { NextApiRequest, NextApiResponse } from "next";
import { promises as fs } from "fs";
import path from "path";

// Returns the raw contents of the JS API MDX page as text
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { doc } = req.query;

    // Check if the doc parameter is js_api
    if (doc !== "js_api") {
      return res.status(400).json({
        message: "Invalid document requested",
      });
    }

    const projectRoot = process.cwd();
    const mdxRelativePath = path.join("pages", "docs", "api", "js.mdx");
    const mdxAbsolutePath = path.join(projectRoot, mdxRelativePath);

    const content = await fs.readFile(mdxAbsolutePath, "utf8");

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    // Set cache control headers to improve performance
    res.setHeader(
      "Cache-Control",
      // Cache for 1 hour (3600s), with stale-while-revalidate for up to 24 hours (86400s)
      "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400"
    );
    res.status(200).send(content);
  } catch (error) {
    res.status(500).json({
      message: "Failed to read MDX file",
      error: (error as Error).message,
    });
  }
}
