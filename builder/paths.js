/*jslint node: true, esversion: 6 */
"use strict";


/**
 * LIGHTWEIGHT ADVENTURES PATHS
 * @version 1.0.0
 * @author Pixels & Bytes
 *
 * @exports paths
 */



// THE PATHS
const BUILD       = ".build/";
const TEMPLATES   = "templates/";

const BLOG        = BUILD + "blog/";
const INDEX       = BUILD + "index.html";
const TAG_ARCHIVE = BUILD + "tag/index.html";
const CAT_ARCHIVE = BUILD + "category/index.html";
const ARCHIVE     = BUILD + "archive.html";


//  const SEARCH      = BUILD + "search.html";
//  const SEARCH_JSON = BUILD + "searchIndex.json";



module.exports = {
  BUILD, BLOG, TEMPLATES, INDEX, TAG_ARCHIVE, CAT_ARCHIVE, ARCHIVE
};
