import * as Webpack from 'webpack';
import merge from 'webpack-merge';

import backgroundConfig from './background.config';
import contentScriptConfig from './content_script.config';
import popupConfig from './popup.config';
import commonConfig from './common.config';

const config: Webpack.ConfigurationFactory = async (_, argv) =>
  merge(await commonConfig(_, argv), backgroundConfig, contentScriptConfig, popupConfig);

export default config;
