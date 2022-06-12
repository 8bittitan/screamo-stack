/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  cacheDirectory: './node_modules/.cache/remix',
  ignoredRouteFiles: ['.*', '**/*.css', '**/*.test.{js,jsx,ts,tsx}'],
  serverDependenciesToBundle: [
    'd3-array',
    'd3-time',
    'd3-interpolate',
    'd3-format',
    'd3-scale',
    'd3-time-format',
    'internmap',
    'd3-color',
    'd3-shape',
    'd3-path',
  ],
};
