import { isArray } from 'util';
import path from 'path';
import HtmlWebpackPlugin from 'packing-html-webpack-plugin';
import glob from 'glob';
import packing from './packing';

const { templateExtension } = packing;
const { dist, templatesDistPages, mockPageInit } = packing.path;
const htmlWebpackPluginConfig = [];
const globOptions = { cwd: path.resolve(templatesDistPages) };
const jsExt = '.js';
const pattern = isArray(templateExtension) && templateExtension.length > 1 ?
  `**/*{${templateExtension.join(',')}}` :
  `**/*${templateExtension}`;


glob.sync(pattern, globOptions).forEach(page => {
  const ext = path.extname(page);
  const templateInitData = path.resolve(mockPageInit, page.replace(ext, jsExt));
  htmlWebpackPluginConfig.push({
    filename: page,
    template: path.resolve(templatesDistPages, page),
    templateInitData,
    cache: false,
    inject: false,
  });
});

const projectRootPath = path.resolve(__dirname, '../');
const assetsPath = path.resolve(projectRootPath, dist);

const output = {
  // prd环境静态文件输出地址
  path: assetsPath,
};

const moduleConfig = {
  loaders: [
    { test: /\.jade$/, loader: 'jade' },
    { test: /\.html$/, loader: 'html' }
  ]
};

const plugins = htmlWebpackPluginConfig.map((item) => new HtmlWebpackPlugin(item));

export default {
  output,
  module: moduleConfig,
  plugins,
};
