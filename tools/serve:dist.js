import path from 'path';
import Express from 'express';
import webpack from 'webpack';
import urlrewrite from 'packing-urlrewrite';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../config/webpack.serve:dist';
import packing from '../config/packing';

const { src, assetsDist } = packing.path;
const compiler = webpack(webpackConfig);
const port = packing.port.dist;
const serverOptions = {
  contentBase: src,
  quiet: false,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: { colors: true }
};

const app = new Express();

console.log('=======', path.join(__dirname, '..', assetsDist));
app.use(Express.static(path.join(__dirname, '..', assetsDist)));
app.use(urlrewrite(packing.rewriteRules));
app.use(webpackDevMiddleware(compiler, serverOptions));

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info('==> 🚧  Webpack development server listening on port %s', port);
  }
});
