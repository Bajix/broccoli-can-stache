# broccoli-can-stache

Build tool to preload CanJS stache files

## Install
From NPM:

> npm install broccoli-can-stache --save

## Compile Stache

Once installed, you can use `broccoli-can-stache` like this:

```javascript
var pickFiles = require('broccoli-static-compiler'),
    stacheCompile = require('broccoli-can-stache'),
    mergeTrees = require('broccoli-merge-trees');

var trees = {
  views: ['**/*.stache']
}, out = [];

for (var dir in trees) {
  trees[dir] = pickFiles('assets', {
    srcDir: dir,
    files: trees[dir],
    destDir: dir
  });
}

trees.views = stacheCompile(trees.views, {
  minify: true,
  out: 'views.compiled.js'
});

out.push(trees.views);

module.exports = mergeTrees(out);
```

### Options

#### minify
Type: `Boolean`
Default: `false`

Defines whether or not to apply minimize against the input files.

#### minimize
Type: `Object`
default: `{}`

Defines [minimize](https://github.com/Moveo/minimize) options.

> Due to compatibility issues, the empty option will always be override and set to true;

#### out
Type: `String`
default: ''

If set, the results will be concatenated before being wrapped.

#### wrapper
Type: `String`
default:

```javascript
define(["can"], function( can ) {
{{{content}}}
});
```

Wrapper to be applied to the resulting output. {{{content}}} will be replaced with the compiled results.