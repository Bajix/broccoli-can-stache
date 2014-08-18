var Filter = require('broccoli-filter'),
  walkSync = require('walk-sync'),
  path = require('path'),
  fs = require('fs');

var wrapper = fs.readFileSync(path.resolve(__dirname, './wrapper.js' )).toString();

function ConcatStache( inputTree, options ) {
  if (!(this instanceof ConcatStache)) {
    return new ConcatStache(inputTree, options);
  }

  this.inputTree = inputTree;
  this.options = options = options || {};

  if (!options.wrapper) {
    options.wrapper = wrapper;
  }
}

ConcatStache.prototype = Object.create(Filter.prototype);
ConcatStache.prototype.constructor = ConcatStache;

ConcatStache.prototype.write = function( readTree, destDir ) {
  var self = this;

  return readTree(this.inputTree).then(function( srcDir ) {
    var paths = walkSync(srcDir).filter(function( relativePath ) {
      return relativePath.slice(-1) !== '/';
    });

    return self.processFiles(srcDir, destDir, paths);
  });
};

ConcatStache.prototype.processFiles = function( srcDir, destDir, paths ) {
  var str = paths.map(function( relativePath ) {
    return fs.readFileSync(srcDir + '/' + relativePath, { encoding: 'utf8'});
  }).join('\n');

  var content = this.options.wrapper.replace('{{{content}}}', str);

  fs.writeFileSync(destDir + '/' + this.options.out, content, { encoding: 'utf8' });
};

module.exports = ConcatStache;