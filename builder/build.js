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
 * @requires markdown-it
 * @requires fp
 * @requires fs
 * @requires rename
 * @requires site.json
 * @requires templates
 */



// THE REQUIREMENTS
const _          = require('./fp');
const contentful = require('./contentful');
const md         = require('markdown-it')({ html: true, linkify: true, typographer: true });
const fs         = require('fs');
const path       = require('./paths');
const rename     = require('rename');
const site       = require('../site.json');
const template   = require('./templates');


// THE SETTINGS
const BLOG = true;
const MD_OPTIONS = {};


// IO FILTH
const saveFile = x => fs.writeFileSync(x.buildpath, x.file);
const save = _.map(saveFile);


// CUSTOM FUNCTIONS FOR THIS PROBLEM
const getData = type => _.comp(_.map(i => i.fields), _.filter(i => i.sys.contentType.sys.id == type));

const applyT = t => x => {
  x.file = t(x.file);
  return x;
};

const genPath = blog => x => {
  x.buildpath = rename((blog ? path.BLOG : path.BUILD) + x.slug, { extname: '.html' });
  return x;
};

const markdown = x => {
  x.content = md.render(x.content);
  return x;
};

// THE COMPOSITIONS
const statiq = _.comp(
  _.map(applyT(template.PAGE)),
  _.map(i => ({ buildpath: i.buildpath, file: i })),
  _.map(_.addO({ site: site })),
  _.tap(_.log),
  _.map(markdown),
  _.map(genPath()),
  _.map(_.dupe)
);


// MAIN PROGRAM
contentful.getSpace().then((items) => {
  const posts = getData('post')(items);
  const pages = getData('page')(items);

  save(statiq(pages));
});
