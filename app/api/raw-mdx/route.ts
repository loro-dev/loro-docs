import { promises as fs } from "fs";
import path from "path";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const doc = req.nextUrl.searchParams.get("doc");
    if (doc !== "js_api") {
      return NextResponse.json(
        { message: "Invalid document requested" },
        { status: 400 }
      );
    }

    const projectRoot = process.cwd();
    const mdxAbsolutePath = path.join(
      projectRoot,
      "content",
      "docs",
      "api",
      "js.mdx"
    );
    const content = await fs.readFile(mdxAbsolutePath, "utf8");

    return new NextResponse(content, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control":
          "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to read MDX file",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
