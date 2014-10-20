'use strict';

var fs        = require('fs'),
    expect    = require('chai').expect,
    unsweeten = require('./');

describe('the unsweeten module', function() {
    fs.readdirSync('./test/').forEach(function(file) {
        var should = file.indexOf('.not.js') > -1 ? 'should not' : 'should';
        it(should + ' process ' + file.replace(/\-/g, ' ').split('.')[0], function() {
            var contents = fs.readFileSync('./test/' + file, 'utf-8').split('\n>>>>>>\n');
            expect(unsweeten(contents[0])).to.be.equal(contents[1]);
        });
    });
});
