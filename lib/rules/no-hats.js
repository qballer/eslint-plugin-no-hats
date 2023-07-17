/**
 * @fileoverview no hats
 * @author Doron Tsur
 */
"use strict";
const fs = require('fs');
const path = require('path');


/** @type {import('eslint').Rule.RuleModule} */
function findPackageJsonFile(startDir) {
  let currentDir = path.resolve(startDir);

  while (true) {
    const packageJsonPath = path.join(currentDir, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      return packageJsonPath;
    }

    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) {
      break; // Reached the root directory
    }

    currentDir = parentDir;
  }

  return null; // package.json not found
}

function noHatsInList(list, reporter) {
	return Object.keys(list).every(function(dependency) {
		const version = list[dependency];
		return !!~version.indexOf('git') ||
			version.split('.').every(function(number){
				if (isNaN(parseInt(number.trim()))){
					reporter({dependency, version});
				}
			});
	});
}

//
// returns true if check passed, no dependencies has hats.
//
function checkHats(pathToPckgJSON, reporter) {
	let pckgJSON = null
	try {
	  pckgJSON = JSON.parse(fs.readFileSync(pathToPckgJSON, 'utf8'));
	} catch(e) {
		return false;
	}
	return noHatsInList(pckgJSON.dependencies     || {}, reporter) &&
		   noHatsInList(pckgJSON.devDependencies  || {}, reporter) &&
		   noHatsInList(pckgJSON.peerDependencies || {}, reporter);
}

module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "no hats",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
  },

  create(context) {
    const pathToPkgJson = findPackageJsonFile(process.cwd())
    
    function reporter ({version, dependency}){
      context.report({
        loc: {
          start: {
            line: 0,
            col: 0
          },
          end: {
            line:0,
            col:0
          }
        },
        message: `Invalid version ${version} for dep ${dependency}`
      })
    }
    
    return {
      Program(){
        return checkHats(pathToPkgJson, reporter)
      }
    }
  }
}
