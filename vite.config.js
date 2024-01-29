import { fileURLToPath, URL } from 'node:url';
import { rmSync } from 'node:fs';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import electron from 'vite-plugin-electron/simple';
import renderer from 'vite-plugin-electron-renderer';
import vueJsx from '@vitejs/plugin-vue-jsx';
import svgLoader from 'vite-svg-loader';
import Components from 'unplugin-vue-components/vite';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import ViteFonts from 'unplugin-fonts/vite';
import { notBundle } from 'vite-plugin-electron/plugin';
import pkg from './package.json';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import VueDevTools from 'vite-plugin-vue-devtools';

export default defineConfig(({ command }) => {
  rmSync('dist-electron', { recursive: true, force: true });

  const isServe = command === 'serve';
  const isBuild = command === 'build';
  const sourcemap = isServe || !!process.env.VSCODE_DEBUG;

  return {
    plugins: [
      VueDevTools(),
      vue({
        script: {
          defineModel: true,
        },
      }),
      ViteFonts({
        google: {
          families: [
            {
              name: 'Roboto',
              styles: 'wght@100;300;400;500;700;900',
            },
          ],
        },
      }),
      vueJsx(),
      svgLoader(),
      Components({
        dts: true,
        // 组件的有效文件扩展名。
        extensions: ['vue', 'tsx'],
        // 允许子目录作为组件的命名空间前缀。
        directoryAsNamespace: false,
        dirs: ['src/components'], // 自定义组件自动注册的目录
        resolvers: [NaiveUiResolver()],
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/, /\.tsx$/],
      }),
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          '@vueuse/head',
          '@vueuse/core',
          {
            'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
          },
        ],
        // 可以选择auto-import.d.ts生成的位置，使用ts建议设置为'src/auto-import.d.ts'
        // dts: 'src/auto-import.d.ts'
      }),
      electron({
        main: {
          // Main process entry file of the Electron App.
          entry: 'electron/main/index.ts',
          onstart({ startup }) {
            if (process.env.VSCODE_DEBUG) {
              console.log(/* For `.vscode/.debug.script.mjs` */ '[startup] Electron App');
            } else {
              startup();
            }
          },
          vite: {
            build: {
              sourcemap,
              minify: isBuild,
              outDir: 'dist-electron/main',
              rollupOptions: {
                // Some third-party Node.js libraries may not be built correctly by Vite, especially `C/C++` addons,
                // we can use `external` to exclude them to ensure they work correctly.
                // Others need to put them in `dependencies` to ensure they are collected into `app.asar` after the app is built.
                // Of course, this is not absolute, just this way is relatively simple. :)
                external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
              },
            },
            plugins: [
              // This is just an option to improve build performance, it's non-deterministic!
              // e.g. `import log from 'electron-log'` -> `const log = require('electron-log')`
              isServe && notBundle(),
            ],
          },
        },
        preload: {
          entry: 'electron/preload/index.ts',
          onstart({ reload }) {
            // Notify the Renderer process to reload the page when the Preload scripts build is complete,
            // instead of restarting the entire Electron App.
            reload();
          },
          vite: {
            build: {
              sourcemap: sourcemap ? 'inline' : undefined, // #332
              minify: isBuild,
              outDir: 'dist-electron/preload',
              rollupOptions: {
                external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
                // external: ['sqlite3','@sequelize/core','xlsx']
              },
            },
            plugins: [isServe && notBundle()],
          },
        },
        renderer: {
          // C/C++ addons
          resolve: {
            'sqlite3': { type: 'cjs' },
            '@sequelize/core': { type: 'cjs' },
            '@sequelize/core/decorators-legacy': { type: 'cjs' },
            'xlsx': { type: 'cjs' },
          },
        },
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '%': resolve(__dirname, 'electron'),
      },
      extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
    },
    server:
      process.env.VSCODE_DEBUG &&
      (() => {
        const url = new URL(pkg.debug.env.VITE_DEV_SERVER_URL);
        return {
          host: url.hostname,
          port: +url.port,
        };
      })(),
    clearScreen: false,
  };
});
