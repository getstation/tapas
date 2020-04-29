import HtmlWebpackPlugin from 'html-webpack-plugin';
import * as path from 'path';
import * as Webpack from 'webpack';

const rootFolder = path.resolve(__dirname, '..');
const srcFolder = path.join(rootFolder, 'src');

/**
 * Path to popup script
 */
const popupFolder = path.join(srcFolder, 'popup');
const popupFile = path.join(popupFolder, 'popup.tsx');
const popupTemplate = path.join(popupFolder, 'popup.html');

// popup config
const config: Webpack.Configuration = {
  entry: {
    popup: popupFile,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: popupTemplate,
      chunks: ['popup'],
      filename: 'popup.html',
    }),
  ],
};

export default config;
