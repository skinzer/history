/*global __dirname, console, require*/
const dust = require('dustjs-linkedin');
const dustEngine = require('hapi-dust');
const hapi = require('hapi');
const hoek = require('hoek');
const fs = require('fs');
const inert = require('inert');
const lout = require('lout');
const notifier = require('node-notifier');
require('tuxharness');
const swagger = require('hapi-swagger');
const vision = require('vision');

const pkg = require('../../package');
const rename = require('../../plugins/rename/lib');
const routeTable = require('./route.js');
const quickmap = require('../../plugins/quickmap/lib');

const server = new hapi.Server();
server.connection({ port: 8000 });

const plugins = [
  { register: inert },
  { register: vision },
  { register: routeTable },
  {
    register: rename,
    routes: { prefix: '/admin' }
  },
  {
    register: quickmap,
    routes: { prefix: '/notes' }
  },
  {
    register: swagger,
    options: { info: { title: 'history API', version: pkg.version } }
  },
  { register: lout }
];

const setup = (error) => {
  hoek.assert(!error, error);
  const dustViews = fs.readFileSync('./public/views.min.js');

  dust.loadSource(dustViews);
  console.log('Views loaded to cache');

  server.start();
  console.log(`Server running at ${server.info.uri}`);
  notifier.notify({
    title: 'Server event',
    message: `Running at ${server.info.uri}`
  });
};

server.register(plugins, setup);

server.views({
  defaultExtension: 'dust',
  engines: {
    dust: dustEngine
  },
  isCached: true,
  path: '../views',
  partialsPath: '../views',
  relativeTo: __dirname
});
