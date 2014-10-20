define('double', ['lodash', 'jquery'], function(_, $) {
    var doubleArrayValuesPromise = function(array) {
        var deferred = $.Deferred();
        deferred.resolve(_.map(array, function(num) { return num + num; }));
        return deferred.promise();
    };

    return doubleArrayValuesPromise;
});

>>>>>>
define('double', ['lodash', 'jquery'], function(_, $) {
    var doubleArrayValuesPromise = function(array) {
        var deferred = $.Deferred();
        deferred.resolve(_.map(array, function(num) { return num + num; }));
        return deferred.promise();
    };

    return doubleArrayValuesPromise;
});
