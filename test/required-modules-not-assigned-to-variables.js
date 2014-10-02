define('pluginWrapper', ['require', 'somejqueryplugin', 'jquery'], function(require) {
    require('somejqueryplugin');
    var $ = require('jquery');

    return function(selector) {
        return $(selector).somejQueryPlugin({ customOption: true });
    };
});

>>>>>>
define('pluginWrapper', ['jquery', 'somejqueryplugin'], function($) {
    return function(selector) {
        return $(selector).somejQueryPlugin({ customOption: true });
    };
});
