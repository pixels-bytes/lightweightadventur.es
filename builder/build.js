/*jslint node: true, esversion: 6 */
"use strict";


/**
 * LIGHTWEIGHT ADVENTURES SITE BUILDER
 * @version 1.0.0
 * @author Pixels & Bytes
 *
 *         Built with myriad technologies
 *         - grunt work: nodejs
 *         - CMS: Contentful
 *         - VCS: Github
 *         – Hosting: Netlify
 *
 * @requires contenful
 * @requires fp
 * @requires fs
 * @requires rename
 * @requires site.json
 * @requires templates
 */



// THE REQUIREMENTS
const _          = require('./fp');
const contentful = require('./contentful');
const fs         = require('fs');
const path       = require('./paths');
const rename     = require('rename');
const site       = require('../site.json');
const template   = require('./templates');


// IO FILTH
const saveFile = x => fs.writeFileSync(x.buildpath, x.template);
const save = _.map(saveFile);


// CUSTOM FUNCTIONS FOR THIS PROBLEM
const extract = x => x.fields;
const genPath = x => {
  x.buildpath = rename(path.BUILD + x.slug, {
    extname: '.html'
  });

  return x;
};


// THE COMPOSITIONS
const getData = type => _.comp(_.map(extract), _.filter(i => i.sys.contentType.sys.id == type));
const statiq = "";


// MAIN PROGRAM
contentful.getSpace().then((items) => {
  const posts = getData('post')(items);
  const pages = getData('page')(items);

  _.log(pages);


//  pages.forEach(p => _.log(p.fields));
//  posts.forEach(p => _.log(p.fields.tags));

//  fs.writeFileSync('.build/index.html', template.INDEX(posts));
});
