import type { IndexHtmlTransformResult, HtmlTagDescriptor, Plugin } from 'vite';

declare const eruda: any;

declare const navigator: any;

const src = 'https://file.40017.cn/international/libs/eruda.js';

const addScript = () => {
  if (
    navigator.userAgent.toLowerCase().indexOf('webview') > -1 ||
    navigator.userAgent.toLowerCase().indexOf('hopegoo') > -1 ||
    (navigator.platform.toLowerCase() !== 'win32' &&
      !/^Mac/i.test(navigator.platform))
  ) {
    eruda.init();
  }
};

const getLoadingHtml = () => {
  return `<div id="eruda-loading" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: #fff; color: #000; display: flex; justify-content: center; align-items: center; z-index: 9999;">Loading...</div>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const erudaLoading = document.getElementById('eruda-loading');
      if (erudaLoading) {
          erudaLoading.remove();
      }
    });
  </script>`;
};

export default (
  {
    debug,
  }: {
    debug: boolean | undefined;
  } = {
      debug: undefined,
    },
) => {
  const plugin: Plugin = {
    name: 'vite-devtool',
    transformIndexHtml(html: string): IndexHtmlTransformResult {
      const tags: HtmlTagDescriptor[] = [
        {
          tag: 'script',
          attrs: {
            src: src,
          },
          injectTo: 'head',
        },
        {
          tag: 'script',
          children: addScript.toString().match(/{([\s\S]*)}/)?.[1],
          injectTo: 'head',
        },
      ];

      if (debug) {
        html = html.replace('</body>', getLoadingHtml() + '</body>');
        return {
          html,
          tags,
        };
      } else {
        return html;
      }
    },
  };
  return plugin;
};
