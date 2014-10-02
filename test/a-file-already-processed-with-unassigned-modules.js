define('pluginWrapper', ['jquery', 'somejqueryplugin'], function($) {
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
