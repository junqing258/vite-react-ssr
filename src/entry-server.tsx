import type { Request, Response } from "express";
import { StrictMode } from "react";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Writable } from "stream";
import "virtual:uno.css";
import { Helmet } from "react-helmet";
import App from "./App";
import { detectDevice } from "./utils/deviceDetection";
import { pageDataLoader } from "./server/pageDataLoder";
import { detectServerLanguage } from "./server/languageDetector";

const getRoot = (
  { req, detectedLanguage }: { req: Request; detectedLanguage: string },
  pageData: any
) => {
  const userAgent = req.headers["user-agent"] || "";
  const deviceInfo = detectDevice(userAgent);

  return (
    <StrictMode>
      <Helmet>
        <html lang={detectedLanguage} />
        <script>{`window.__INITIAL_DATA__ = ${JSON.stringify(
          pageData || {}
        )}`}</script>
        <script>{`window.__INITIAL_LANGUAGE__ = ${JSON.stringify(
          detectedLanguage
        )}`}</script>
      </Helmet>
      <StaticRouter location={req.url}>
        <App
          pageData={pageData}
          deviceInfo={deviceInfo}
          initialLanguage={detectedLanguage}
        />
      </StaticRouter>
    </StrictMode>
  );
};

export async function render({ req }: { req: Request; res: Response }) {
  let pathWithoutLang = req.url;
  let detectedLanguage = "zh-CN"; // 默认语言

  const result = detectServerLanguage(req);
  detectedLanguage = result.language;
  pathWithoutLang = result.pathWithoutLang;

  const pageData = await pageDataLoader({
    pathWithoutLang,
    req,
  });

  return new Promise<{
    html: string;
    head: string;
    htmlAttributes?: string;
    pageData?: any;
  }>((resolve, reject) => {
    const chunks: Buffer[] = [];

    const writable = new Writable({
      write(chunk, _encoding, callback) {
        chunks.push(chunk);
        callback();
      },
      final(callback) {
        const html = Buffer.concat(chunks).toString("utf-8");

        const helmet = Helmet.renderStatic();
        const head = [
          helmet.title.toString(),
          helmet.meta.toString().replace(/><meta/g, `>\n<meta`),
          helmet.link.toString().replace(/><link/g, `>\n<link`),
          helmet.script.toString().replace(/><script/g, `>\n<script`),
          helmet.style.toString(),
        ]
          .join("\n")
          .replace(/ data-react-helmet="true"/g, "");

        const htmlAttributes = helmet.htmlAttributes.toString();

        resolve({ html, head, htmlAttributes, pageData });
        callback();
      },
    });

    const stream = renderToPipeableStream(
      getRoot({ req, detectedLanguage }, pageData),
      {
        onShellReady() {
          // The content above all Suspense boundaries is ready
          stream.pipe(writable);
        },
        onShellError(error: unknown) {
          // Something errored before we could complete the shell
          reject(error);
        },
        onError(error: unknown) {
          console.error("SSR Error:", error);
        },
      }
    );
  });
}
