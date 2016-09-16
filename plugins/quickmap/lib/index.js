/* global __dirname require */
const dustEngine = require('hapi-dust');
const joi = require('joi');
const path = require('path');

exports.register = (server, options, next) => {
  server.route({
    method: 'GET',
    path: '/map',
    config: {
      handler: (request, reply) => reply.view('form'),
      tags: ['api', 'plugin', 'v1'],
    },
  });

  server.route({
    method: 'GET',
    path: '/static/{param*}',
    handler: {
      directory: {
        listing: true,
        path: path.join(__dirname, '../public'),
      }
    }
  });

  server.views({
    defaultExtension: 'dust',
    engines: {
      dust: dustEngine
    },
    isCached: true,
    path: './views',
    partialsPath: './views',
    relativeTo: __dirname
  });

  next();
};

exports.register.attributes = {
  pkg: require('../package.json'),
};
