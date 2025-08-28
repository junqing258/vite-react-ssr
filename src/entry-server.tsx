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
// 确保语言检测器被打包到 dist 中
import * as languageDetector from "./server/languageDetector";

type Options = {
  url: string;
  originalUrl?: string;
  userAgent: string;
  language?: string;
};

const getRoot = (
  { url, userAgent, language = "zh-CN" }: Options,
  pageData: any
) => {
  const deviceInfo = detectDevice(userAgent);
  const i18nInstance = createServerI18n(language);

  return (
    <StrictMode>
      <Helmet>
        <html lang={language} />
        <script>{`window.__INITIAL_DATA__ = ${JSON.stringify(
          pageData || {}
        )}`}</script>
        <script>{`window.__INITIAL_LANGUAGE__ = ${JSON.stringify(
          language
        )}`}</script>
      </Helmet>
      <I18nextProvider i18n={i18nInstance}>
        <LocalizedRouteProvider language={language}>
          <StaticRouter location={url}>
            <DeviceContext.Provider value={{ deviceInfo }}>
              <App pageData={pageData || {}} />
            </DeviceContext.Provider>
          </StaticRouter>
        </LocalizedRouteProvider>
      </I18nextProvider>
    </StrictMode>
  );
};

export async function render(opt: Options) {
  const pageData = await pageDataLoader({
    url: opt.url,
    cookie: "", // 暂时传递空字符串，如果需要可以从其他地方获取
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

    const stream = renderToPipeableStream(getRoot(opt, pageData), {
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
    });
  });
}

// 导出语言检测器函数，确保它们在生产构建中可用
export const {
  detectServerLanguage,
  shouldRedirectToLocalizedUrl,
  extractLanguageFromPath,
} = languageDetector;
