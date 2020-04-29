import CopyWebpackPlugin from 'copy-webpack-plugin';
import * as path from 'path';
import * as Webpack from 'webpack';

const rootFolder = path.resolve(__dirname, '..');
const srcFolder = path.join(rootFolder, 'src');

/**
 * Path to background script
 */
const backgroundFolder = path.join(srcFolder, 'background');
const backgroundFile = path.join(backgroundFolder, 'background.ts');

// background config
const config: Webpack.Configuration = {
  entry: {
    background: backgroundFile,
  },
  plugins: [
    new CopyWebpackPlugin(
      [
        {
          from: 'node_modules/webextension-polyfill/dist/browser-polyfill.min.js',
        },
      ],
      { copyUnmodified: true },
    ),
  ],
};

export default config;
