# unsweeten [![Build Status](https://travis-ci.org/ben-eb/unsweeten.svg?branch=master)](https://travis-ci.org/ben-eb/unsweeten) [![NPM version](https://badge.fury.io/js/unsweeten.svg)](http://badge.fury.io/js/unsweeten) [![Dependency Status](https://gemnasium.com/ben-eb/unsweeten.svg)](https://gemnasium.com/ben-eb/unsweeten)

> Transform require.js sugar syntax into the standard syntax.

Install via [npm](https://npmjs.org/package/unsweeten):

```
npm install unsweeten --save-dev
```

## What it does

This module takes the [require.js sugar syntax](http://requirejs.org/docs/whyamd.html#sugar):

```js
define(['require', 'dependency1', 'dependency2'], function(require) {
    var dependency1 = require('dependency1'),
        dependency2 = require('dependency2');

    return function() {};
});
```

And converts it back into the standard syntax:

```js
define(['dependency1', 'dependency2'], function(dependency1, dependency2) {
    return function() {};
});
```

It will also work for dependencies that you are just loading but are not assigned to any variables, such as loading jQuery and a plugin:

```js
define(['require', 'jquery', 'somejqueryplugin'], function(require) {
    var $ = require('jquery');
    require('somejqueryplugin');

    return function() {};
});
```

Becomes:

```js
define(['jquery', 'somejqueryplugin'], function($) {
    return function() {};
});
```

For large projects using AMD, using `unsweeten` will help you cut down a significant amount of loader code that just isn't necessary.

## Example

The best way to use this module is as a part of your `r.js` build step. Using the `onBuildWrite` function, you can apply extra transformations to your source code before it is minified. Below is an example configuration using gulp as a task runner:

```js
var gulp      = require('gulp'),
    gutil     = require('gulp-util'),
    requirejs = require('requirejs'),
    unsweeten = require('unsweeten');

gulp.task('build', function(cb) {
    requirejs.optimize({
        name: 'main',
        baseUrl: 'lib',
        mainConfigFile: 'lib/config.js',
        out: 'web/js/master.min.js',
        optimizeAllPluginResources: true,
        stubModules: ['text'],
        onBuildWrite: function(name, filePath, contents) {
            if (path.extname(filePath).indexOf('js') > -1) {
                return unsweeten(contents);
            }
            return contents;
        }
    }, function() {
        gutil.log('[' + gutil.colors.green('require.js') + '] Build complete.');
        cb();
    }, cb);
});
```

## License

MIT © Ben Briggs
