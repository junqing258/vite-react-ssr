import type { Request, Response } from "express";
import { StrictMode } from "react";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Writable } from "stream";
import "virtual:uno.css";
import { Helmet } from "react-helmet";
import { I18nextProvider } from "react-i18next";
import App from "./App";
import { DeviceContext } from "./contexts/DeviceContext";
import { LocalizedRouteProvider } from "./components/LocalizedRoute";
import { detectDevice } from "./utils/deviceDetection";
import { pageDataLoader } from "./server/pageDataLoder";
import { createServerI18n } from "./server/i18nServer";
import { detectServerLanguage } from "./server/languageDetector";

const getRoot = (
  { req, detectedLanguage }: { req: Request; detectedLanguage: string },
  pageData: any
) => {
  const userAgent = req.headers["user-agent"] || "";
  // const cookie = req.headers["cookie"] || "";
  const deviceInfo = detectDevice(userAgent);
  const i18nInstance = createServerI18n(detectedLanguage);

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
      <I18nextProvider i18n={i18nInstance}>
        <LocalizedRouteProvider language={detectedLanguage}>
          <StaticRouter location={req.url}>
            <DeviceContext.Provider value={{ deviceInfo }}>
              <App pageData={pageData || {}} />
            </DeviceContext.Provider>
          </StaticRouter>
        </LocalizedRouteProvider>
      </I18nextProvider>
    </StrictMode>
  );
};

export async function render({ req, res }: { req: Request; res: Response }) {
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
