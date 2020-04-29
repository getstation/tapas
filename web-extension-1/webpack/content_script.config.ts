import HtmlWebpackPlugin from 'html-webpack-plugin';
import * as path from 'path';
import * as Webpack from 'webpack';

const rootFolder = path.resolve(__dirname, '..');
const srcFolder = path.join(rootFolder, 'src');

/**
 * Path to all content script
 */
const contentScriptFolder = path.join(srcFolder, 'content_script');
const contentScriptInit = path.join(contentScriptFolder, 'content_script.ts');

// content_script config
const config: Webpack.Configuration = {
  entry: {
    'content-script': contentScriptInit,
  },
};

export default config;
