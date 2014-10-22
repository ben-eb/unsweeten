# unsweeten [![Build Status](https://travis-ci.org/ben-eb/unsweeten.svg?branch=master)](https://travis-ci.org/ben-eb/unsweeten) [![NPM version](https://badge.fury.io/js/unsweeten.svg)](http://badge.fury.io/js/unsweeten) [![Dependency Status](https://gemnasium.com/ben-eb/unsweeten.svg)](https://gemnasium.com/ben-eb/unsweeten) [![Coverage Status](https://img.shields.io/coveralls/ben-eb/unsweeten.svg)](https://coveralls.io/r/ben-eb/unsweeten)

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
var path      = require('path'),
    gulp      = require('gulp'),
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

## Limitations

`unsweeten` destructively transforms your JavaScript source code, changing its footprint to make it smaller. For this reason, it's recommended to use it on a copy of your file, in a build step, so that your original code is left untouched. Remember that the sugar syntax is recommended for development use to help you visualise the file's dependencies.

Some files may fail this transform. In the [test directory](test/) are examples of code that will be transformed; notably absent are those files that have *more than one* `define` call in them. When using this library on your own code you will most likely find that all of your development files have a single call to `define`, as in my case. However, some *vendor* code may package up several of these calls into a single file. For this reason it is recommended to only use `unsweeten` on your own code. Bear in mind that any file not run through this transform will continue to work as normal.

If you find an example of breakage using `unsweeten` then please open an issue with the source code, output, and the expected output. If you can, a pull request is even better!

## Contributing

Pull requests are welcome. If you add functionality, then please add unit tests to cover it.

## License

MIT © Ben Briggs
