import { createReadStream } from "node:fs";
import { promises as fs } from "node:fs";
import http from "node:http";
import path from "node:path";
import { pathToFileURL } from "node:url";

const rootDir = process.cwd();
const clientDir = path.join(rootDir, "dist", "client");
const serverModulePath = path.join(rootDir, "dist", "server", "server.mjs");
const host = process.env.HOST || "127.0.0.1";
const port = Number(process.env.PORT || "4173");

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mdx": "text/plain; charset=utf-8",
  ".mov": "video/quicktime",
  ".mp4": "video/mp4",
  ".mjs": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".wasm": "application/wasm",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
};

function toStaticFilePath(requestPath) {
  const cleanPath = requestPath.replace(/\?.*$/, "").replace(/#.*$/, "");
  const normalized = cleanPath === "/" ? "/index.html" : cleanPath;
  return path.join(clientDir, normalized);
}

function contentType(filePath) {
  return mimeTypes[path.extname(filePath)] || "application/octet-stream";
}

const { default: serverEntry } = await import(pathToFileURL(serverModulePath).href);

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url || "/", `http://${host}:${port}`);
  const filePath = toStaticFilePath(requestUrl.pathname);

  try {
    const stat = await fs.stat(filePath).catch(() => null);
    if (stat?.isFile()) {
      res.writeHead(200, {
        "Content-Type": contentType(filePath),
        "Content-Length": stat.size,
      });
      if (req.method === "HEAD") {
        res.end();
        return;
      }
      createReadStream(filePath).pipe(res);
      return;
    }

    const request = new Request(requestUrl, {
      method: req.method,
      headers: req.headers,
    });
    const response = await serverEntry.fetch(request);
    res.writeHead(response.status, Object.fromEntries(response.headers));
    if (req.method === "HEAD" || !response.body) {
      res.end();
      return;
    }
    const reader = response.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(Buffer.from(value));
    }
    res.end();
  } catch (error) {
    res.statusCode = 500;
    res.end(String(error?.stack || error));
  }
});

server.listen(port, host, () => {
  console.log(`Preview server listening on http://${host}:${port}`);
});
