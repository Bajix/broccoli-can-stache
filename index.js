var Compiler = require('./lib/compiler'),
  Minimizer = require('./lib/minimizer'),
  Concat = require('./lib/concat');

function Factory( inputTree, options ) {

  if (options.minify) {
    inputTree = Minimizer(inputTree, options.minimize);
  }

  if (options.out) {
    inputTree = Compiler(inputTree, {
      wrapper: '{{{content}}}'
    });
    return new Concat(inputTree, options);
  }

  return new Compiler(inputTree, options);
}

module.exports = Factory;