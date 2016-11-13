/*jslint node: true, esversion: 6, jquery: true */
"use strict";


/**
 * FUSEJS SEARCH PLAYGROUND
 * @version 1.0.0
 * @author Pixels & Bytes
 *
 *         Using Fusejs: http://fusejs.io
 *
 *         Following the tutorial on Browserify here:
 *         https://scotch.io/tutorials/getting-started-with-browserify
 *
 *         run: browserify search.js -o bundle.js
 *
 * @requires fuse.js
 * @requires searchIndex.json
 */


// THE REQUIREMENTS
const Fuse = require('fuse.js');
const files = require('../../searchIndex.json');


// FUSE
const options = {
//  caseSensitive: true, include: ["score", "matches"], tokenize: true, matchAllTokens: true,
//  id: "title",
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  keys: [
    "title",
    "content"
  ]
};

const fuse = new Fuse(files, options);


// JQUERY -- already incuded in js/vendor
$(function () {
  const $inputSearch = $('#inputSearch');
  const $result = $('#results');

  $inputSearch.on('keyup', function () {
    const r = fuse.search($inputSearch.val());
    $result.empty();
    $.each(r, function () {
      $result.append(
        '<li class="result-item"><a href="blog/' + this.slug + '">' + this.title + '</a><p>' + this.excerpt + '</p></li>'
      );
    });
  });
});
