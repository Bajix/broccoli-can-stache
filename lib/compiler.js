var Filter = require('broccoli-filter'),
  path = require('path'),
  fs = require('fs');

var wrapper = fs.readFileSync(path.resolve(__dirname, './wrapper.js' )).toString();

var escMap = {
  '\n': "\\n",
  '\r': "\\r",
  '\u2028': "\\u2028",
  '\u2029': "\\u2029"
};

function esc( string ) {
  return ('' + string).replace(/["'\\\n\r\u2028\u2029]/g, function (character) {
    if("'\"\\".indexOf(character) >= 0) {
      return "\\"+character;
    } else  {
      return escMap[character];
    }
  });
}

function toId( src ) {
  return src.split(/\/|\./g).filter(function( str ) { return str; }).join('_');
}

function StacheFilter( inputTree, options ) {
  if (!(this instanceof StacheFilter)) {
    return new StacheFilter(inputTree, options);
  }

  this.inputTree = inputTree;
  this.options = options = options || {};

  if (!options.wrapper) {
    options.wrapper = wrapper;
  }
}

StacheFilter.prototype = Object.create(Filter.prototype);
StacheFilter.prototype.constructor = StacheFilter;

StacheFilter.prototype.extensions = ['stache'];
StacheFilter.prototype.targetExtension = 'js';

StacheFilter.prototype.processString = function( str, relativePath ) {
  var ID = toId(relativePath),
    content = 'can.view.preload(\'' + ID + '\',can.stache("' + esc(str) + '"));';

  return this.options.wrapper.replace('{{{content}}}', content);
};

module.exports = StacheFilter;