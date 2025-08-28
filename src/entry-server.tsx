import { StrictMode } from "react";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Writable } from "stream";
import "virtual:uno.css";
import { Helmet } from "react-helmet";
import { I18nextProvider } from 'react-i18next';
import App from "./App";
import { DeviceProvider } from "./components/DeviceContext";
import { detectDevice } from "./utils/deviceDetection";
import { pageDataLoader } from "./server/pageDataLoder";
import { createServerI18n } from "./server/i18nServer";

type Options = {
  url: string;
  userAgent: string;
  cookie: string;
  language?: string;
};

const getRoot = ({ url, userAgent, cookie, language = 'zh-CN' }: Options, pageData: any) => {
  const deviceInfo = detectDevice(userAgent);
  const i18nInstance = createServerI18n(language);
  
  return (
    <StrictMode>
      <I18nextProvider i18n={i18nInstance}>
        <StaticRouter location={url}>
          <DeviceProvider deviceInfo={deviceInfo}>
            <Helmet>
              <script>{`window.__INITIAL_DATA__ = ${JSON.stringify(
                pageData || {}
              )}`}</script>
              <script>{`window.__INITIAL_LANGUAGE__ = ${JSON.stringify(language)}`}</script>
            </Helmet>
            <App pageData={pageData || {}} />
          </DeviceProvider>
        </StaticRouter>
      </I18nextProvider>
    </StrictMode>
  );
};

export async function render(opt: Options) {
  const pageData = await pageDataLoader(opt);

  return new Promise<{ html: string; head: string; pageData?: any }>(
    (resolve, reject) => {
      const chunks: Buffer[] = [];

      const writable = new Writable({
        write(chunk, _encoding, callback) {
          chunks.push(chunk);
          callback();
        },
        final(callback) {
          const html = Buffer.concat(chunks).toString("utf-8");

          // Extract head tags from Helmet after rendering
          const helmet = Helmet.renderStatic();
          const head = [
            helmet.title.toString(),
            helmet.meta.toString(),
            helmet.link.toString(),
            helmet.script.toString(),
            helmet.style.toString(),
          ].join("\n");

          resolve({ html, head, pageData });
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
    }
  );
}
