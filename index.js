'use strict';

var rocambole  = require('rocambole'),
    token      = require('rocambole-token'),
    updateNode = require('rocambole-node-update');

module.exports = function(file) {
    
    var ast                  = rocambole.parse(file),
        dependencies         = [],
        assignedDependencies = [];
    
    rocambole.moonwalk(ast, function(node) {
        if (node.type === 'VariableDeclarator') {
            // Make sure that the variable calls the require method
            if (node.init && node.init.type === 'CallExpression' && node.init.callee && node.init.callee.name === 'require') {
                // Add the variable name to the list of dependencies
                dependencies.push(node.id.name);
                assignedDependencies.push(node.id.parent.init.arguments[0].value);
                // Remove the variable statement from the file
                token.eachInBetween(node.parent.startToken, node.parent.endToken, token.remove);
            }
        } else if (node.type === 'Identifier' && node.name === 'require' && node.parent.callee) {
            // Given a require call that looks like this -> require(['main']) - if the second token
            // after the require call are a punctuator and not a string, we can assume that the call
            // is a main entry point, so ignore it.
            if (node.startToken.next.next.type !== 'Punctuator') {
                // Remove unassigned dependencies (those without a variable declaration)
                token.eachInBetween(node.parent.startToken, node.parent.endToken.next, token.remove);
            }
        }
    });
    
    rocambole.moonwalk(ast, function(node) {
        // Looking for the define function call in the file, to modify its arguments
        if (node.type === 'FunctionExpression' && node.parent.callee && node.parent.callee.name === 'define') {
            var dependencyPaths = JSON.parse(node.prev.toString().replace(/'/g, '"'));
            // Remove require from the list of dependencies - it will be the first element in the deps array
            if (dependencyPaths.slice(0, 1)[0] === 'require') {
                dependencyPaths = dependencyPaths.slice(1);
            } 
            // Filter out those dependencies not assigned to variables
            var assignedDependencyPaths = dependencyPaths.filter(function(path) {
                return assignedDependencies.indexOf(path) > -1;
            });
            // Add the dependencies not assigned to variables to the end of the dependencies array
            var dependencyPaths = assignedDependencyPaths.concat(dependencyPaths.filter(function(path) {
                return assignedDependencyPaths.indexOf(path) === -1;
            }));
            // Stringify the resulting array
            dependencyPaths = dependencyPaths.length && "['" + dependencyPaths.join('", "').replace(/"/g, "'") + "']" || '[]';
            // Update the dependencies array, removing require
            updateNode(node.prev, dependencyPaths);
            // Update the function arguments from require, to the new dependencies list
            dependencies.length && updateNode(node.params[0], dependencies.join(', '));
        }
    });
    
    // Trim any whitespace left by removing the variables. Will preserve lines that
    // just contain newlines.
    return ast.toString().replace(/^\s+[\r\n]/gm, '');
};
