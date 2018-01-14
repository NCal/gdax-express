var deps = {
  router: require('express').Router(),
  mid: require('../middleware'),
  fs: require('fs'),
  path: require('path'),
  bluebird: require('bluebird'),
  middleware: require('../middleware/index.js'),
  web3: require('web3')
}

module.exports = deps
