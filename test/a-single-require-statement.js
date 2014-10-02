define('double', ['require', 'lodash'], function(require) {
    var _ = require('lodash');

    var doubleArrayValues = function(array) {
        return _.map(array, function(num) { return num + num; });
    };

    return doubleArrayValues;
});

>>>>>>
define('double', ['lodash'], function(_) {
    var doubleArrayValues = function(array) {
        return _.map(array, function(num) { return num + num; });
    };

    return doubleArrayValues;
});
