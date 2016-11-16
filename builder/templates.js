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
const SINGLE      = pug.compileFile(path.TEMPLATES + "single.pug");
const TAG         = pug.compileFile(path.TEMPLATES + "tag.pug");
const CAT         = pug.compileFile(path.TEMPLATES + "cat.pug");


//  const ARCHIVE     = swig.compileFile(path.TEMPLATES + "archive.html");
//  const SEARCH      = swig.compileFile(path.TEMPLATES + "search.html");



module.exports = {
  INDEX, PAGE, SINGLE, TAG, CAT
};
