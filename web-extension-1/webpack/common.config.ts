/* eslint-disable functional/immutable-data */
import CopyWebpackPlugin from 'copy-webpack-plugin';
import * as Webpack from 'webpack';
import * as path from 'path';

// crashes `tsc` with `import` syntax
// eslint-disable-next-line @typescript-eslint/no-var-requires
const WebpackExtensionReloader = require('webpack-extension-reloader');

const rootFolder = path.resolve(__dirname, '..');
const srcFolder = path.join(rootFolder, 'src');

// common configuration
const config: Webpack.ConfigurationFactory = (_, argv) => {
  // Default config for PROD
  const conf: Webpack.Configuration = {
    devtool: 'source-map',
    resolve: {
      // ⚠️ .mjs to add BEFORE all the others, because: https://github.com/graphql/graphql-js/issues/1272
      extensions: ['.mjs', '.ts', '.tsx', '.js', '.jsx'],
      alias: {
        '@src': srcFolder,
        '@packageJson': path.join(rootFolder, 'package.json'),
      },
    },
    module: {
      rules: [
        { test: /\.tsx?$/, loader: 'ts-loader' },
        { test: /\.graphql$/, exclude: /node_modules/, loader: 'graphql-import-loader' },
        {
          test: /\.(svg|png)$/,
          use: [
            {
              // WARNING: We use url-loader instead of file-loader, because the relative path doesn't work
              // in content-script. For example, it tries to reach an img at "https://google.com/dist/xxx".
              loader: 'url-loader',
            },
          ],
        },
      ],
    },
    plugins: [
      new CopyWebpackPlugin([
        {
          from: 'manifest.json',
        },
        {
          from: 'static/icons/',
          to: 'icons',
        },
      ]),
    ],
  };

  // Overridden config for DEV
  if (argv.mode === 'development') {
    conf.watch = true;
    conf.devtool = 'inline-source-map';
    conf.plugins?.push(
      new WebpackExtensionReloader({
        port: process.env.PORT || process.env.npm_package_config_port, // Which port use to create the server
        reloadPage: true, // Force the reload of the page also
        entries: {
          // The entries used for the content/background scripts
          contentScript: ['content-script'], // Use the entry names, not the file name or the path
          background: 'background', // *REQUIRED
          extensionPage: 'popup',
        },
      }),
    );
  }

  return conf;
};

export default config;
