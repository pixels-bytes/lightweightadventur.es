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
 * @requires site.json
 * @requires templates
 */



// THE REQUIREMENTS
const _          = require('./fp');
const contentful = require('./contentful');
const fs         = require('fs');
const site       = require('../site.json');
const template   = require('./templates');


// MAIN
const posts = { site: site, files: [] };

contentful.getSpace().then((items) => {
  items.forEach(i => {
    posts.files.push(i.fields.title);
    _.log(i.sys.contentType.sys.id);
  });

  fs.writeFileSync('.build/index.html', template.INDEX(posts));
});
