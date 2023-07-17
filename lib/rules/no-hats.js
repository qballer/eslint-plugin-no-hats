/**
 * @fileoverview no hats
 * @author Doron Tsur
 */
"use strict";
const fs = require('fs');
const path = require('path');


function noHatsInList(list, reporter) {
	return Object.keys(list).every((dependency) => {
		const version = list[dependency];
		return !!~version.indexOf('git') ||
			version.split('.').every((number) => {
				if (isNaN(parseInt(number.trim()))){
					reporter({dependency, version});
				}
			});
	});
}

//
// returns true if check passed, no dependencies has hats.
//
function checkHats(packageJSON, reporter) {
	return noHatsInList(packageJSON.dependencies   || {}, reporter) &&
		   noHatsInList(packageJSON.devDependencies  || {}, reporter) &&
		   noHatsInList(packageJSON.peerDependencies || {}, reporter);
}

function isPackageJson (filePath) { 
  return filePath.endsWith('/package.json') || filePath === 'package.json'
}

function extractPackageObjectFromAST(ast) {
    return ast.body[0].expression.right;
}

module.exports = {
    meta: {
        docs: {
            description:'use only fixed versions in package.json',
            category: 'Best Practices',
            recommended: true
        },
        fixable: 'code', // or "code" or "whitespace"
        schema: [
            {
                type: 'array',
                items: {
                    type: 'string'
                }
            }
        ]
    },

    create(context) {
        return {
            'Program:exit': node => {
                if (!isPackageJson(context.getFilename())) {
                    return;
                }
                const sourceCode = context.getSourceCode();
                const packageRoot = extractPackageObjectFromAST(node);
                const original = JSON.parse(sourceCode.getText(packageRoot));

                function reporter({version, dependency}) {
                    context.report({ node: packageRoot, message:`dependency: ${dependency} doesnt have fixed version ${version}`, data: {});
          
                }
                checkHats(original, reporter)
            }
        };
    }
};
