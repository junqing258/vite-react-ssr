import type { Plugin } from 'vite';
import fs from 'fs';
import { get } from 'lodash-es';
import { createFilter } from '@rollup/pluginutils';
import { walk, Node } from 'estree-walker';
import escodegen from 'escodegen';
import chalk from 'chalk';

export default function In18nPlugin(
  options = {
    include: [/\.vue$/, /\.ts$/],
    exclude: [/node_modules/],
    languageFile: './src/locales/zh-cn.json',
  },
): Plugin {
  const filter = createFilter(options.include, options.exclude);

  const data = fs.readFileSync(options.languageFile, 'utf-8');
  const packData = JSON.parse(data);

  return {
    name: 'My-In18nPlugin',
    // apply: 'serve',
    transform(code, id) {
      if (!filter(id)) return;
      const ast = this.parse(code) as Node;
      walk(ast, {
        enter(node: any, parent) {
          if (
            (node.type === 'CallExpression' &&
              node.callee.type === 'Identifier' &&
              node.callee.name === 't') ||
            (node.type === 'CallExpression' &&
              node.callee.type === 'MemberExpression' &&
              node.callee.property.name === 't')
          ) {
            if (typeof node.arguments[0]?.value === 'string') {
              if (!get(packData, node.arguments[0].value)) {
                console.log(
                  chalk.red(
                    `[i18n]未匹配key: ${id} ${node.arguments[0].value}`,
                  ),
                );
              }
              return;
            }

            if (node.arguments[0]?.type === 'TemplateLiteral') {
              console.log(
                chalk.yellow(
                  `\n[i18n]请确认动态key: ${id} ${node.arguments[0].quasis[0].value.raw}`,
                ),
              );

              return;
            }

            console.log(
              chalk.yellow(
                `\n[i18n]请确认动态key: ${id} ${escodegen.generate(node)}`,
              ),
            );
          }
        },
      });
    },
  };
}
