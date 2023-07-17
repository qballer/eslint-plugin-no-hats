/**
 * @fileoverview fixed versions only for deps
 * @author Doron Tsur
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
const rules = requireIndex(__dirname + '/rules')
console.log(rules)
module.exports.rules = rules


