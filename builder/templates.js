/*jslint node: true, esversion: 6 */
"use strict";


/**
 * LIGHTWEIGHT ADVENTURES TEMPLATES
 * @version 1.0.0
 * @author Pixels & Bytes
 *
 * @requires paths
 * @requires pug
 *
 * @exports templates
 */



// THE REQUIREMENTS
const path = require('./paths');
const pug  = require('pug');


// THE TEMPLATES
const INDEX       = pug.compileFile(path.TEMPLATES + "index.pug");
const PAGE        = pug.compileFile(path.TEMPLATES + "page.pug");

//  const ARCHIVE     = swig.compileFile(path.TEMPLATES + "archive.html");
//  const TAG         = swig.compileFile(path.TEMPLATES + "tag.html");
//  const CAT         = swig.compileFile(path.TEMPLATES + "cat.html");
//  const SINGLE      = swig.compileFile(path.TEMPLATES + "single.html");
//  const SEARCH      = swig.compileFile(path.TEMPLATES + "search.html");



module.exports = {
  INDEX, PAGE
};
