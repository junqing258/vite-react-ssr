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
