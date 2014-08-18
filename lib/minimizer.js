var htmlmin = require('broccoli-htmlmin');

module.exports = function( inputTree, options ) {
  options = options || {};
  options.empty = true;
  var minimizer = htmlmin(inputTree, options);
  minimizer.extensions = ['stache'];
  minimizer.targetExtension = 'stache';
  return minimizer;
};