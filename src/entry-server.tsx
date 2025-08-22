import { StrictMode } from "react";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Writable } from "stream";
import "virtual:uno.css";
import { Helmet } from "react-helmet";
import App from "./App";
import { DeviceProvider } from "./components/DeviceContext";
import { detectDevice } from "./utils/deviceDetection";
import { getPageDataForSSR } from "./utils/ssr/pageDataLoader";

type Options = {
  url: string;
  userAgent: string;
  headers?: Record<string, string>;
};

const getRoot = ({ url, userAgent }: Options, pageData?: any) => {
  const deviceInfo = detectDevice(userAgent);
  return (
    <StrictMode>
      <StaticRouter location={url}>
        <DeviceProvider deviceInfo={deviceInfo}>
          <App pageData={pageData} />
        </DeviceProvider>
      </StaticRouter>
    </StrictMode>
  );
};

export async function render(opt: Options) {
  // 预加载页面数据
  const pageData = await getPageDataForSSR(opt);

  return new Promise<{ html: string; head: string; pageData?: any }>((resolve, reject) => {
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
  });
}
