define('double', ['require', 'lodash', 'jquery'], function(require) {
    var _ = require('lodash');

    var _doubleArrayValues = function(array) {
        return _.map(array, function(num) { return num + num; });
    };

    var $ = require('jquery');

    var $doubleArrayValues = function(array) {
        return $.map(array, function(num) { return num + num; });
    };

    return {
        jquery: $doubleArrayValues,
        lodash: _doubleArrayValues
    };
});

>>>>>>
define('double', ['lodash', 'jquery'], function(_, $) {
    var _doubleArrayValues = function(array) {
        return _.map(array, function(num) { return num + num; });
    };
    var $doubleArrayValues = function(array) {
        return $.map(array, function(num) { return num + num; });
    };

    return {
        jquery: $doubleArrayValues,
        lodash: _doubleArrayValues
    };
});
