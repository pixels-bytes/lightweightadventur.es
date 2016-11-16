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
 * @requires markdown-it
 * @requires moment
 * @requires paths
 * @requires rename
 * @requires site.json
 * @requires templates
 */



// THE REQUIREMENTS
const _          = require('./fp');
const contentful = require('./contentful');
const md         = require('markdown-it')({ html: true, linkify: true, typographer: true });
const fs         = require('fs');
const moment     = require('moment');
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


// OH SO PURE
const byDate = (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime();
const byDateDesc = (a, b) => byDate(b, a);


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

const prettyDate = x => {
  x.date = moment(x.date).format('Do MMMM, YYYY');
  return x;
};

// THE COMPOSITIONS
const statiq = _.comp(
  _.map(applyT(template.PAGE)),
  _.map(i => ({ buildpath: i.buildpath, file: i })),
  _.map(_.addO({ site: site })),
  _.map(markdown),
  _.map(genPath()),
  _.map(_.dupe)
);

const individual = _.comp(
  _.map(applyT(template.SINGLE)),
  _.map(i => ({ buildpath: i.buildpath, file: i })),
  _.map(_.addO({ site: site })),
  _.map(markdown),
  _.map(prettyDate),
  _.sort(byDateDesc),
  _.map(genPath(BLOG)),
  _.map(_.dupe)
);

const index = _.comp(
  _.map(applyT(template.INDEX)),
  xs => ([{ buildpath: path.INDEX, file: { files: xs, site: site }}]),
  _.map(markdown),
  _.map(prettyDate),
  _.sort(byDateDesc),
  _.map(_.dupe)
);


// ****************************************************************************

//  const flatUniq = _.comp(_.uniq, _.flatten);
//  const collectUniq = (p) => _.comp(flatUniq, _.map(_.prop(p)));
//  const somePropEq = p => t => _.comp(_.some(_.eq(t)), _.prop(p));

//  const makeTag = p => files => tag => ({
//    title: tag,
//    posts: _.filter(somePropEq(p)(tag))(files)
//  });

//  const tagsFor = _.comp(
//    _.map(applyTemplate(template.TAG)),
//    indexHash(path.TAG),
//    _.S(_.B(_.map)(makeTag('tags')))(collectUniq('tags')),
//    _.map(prettyDate),
//    _.sort(byDateDesc)
//  );

const tag = _.comp(
  _.map(prettyDate),
  _.sort(byDate),
  _.map(_.dupe)
);

// ****************************************************************************


// MAIN PROGRAM
contentful.getSpace().then((space) => {
  const posts = getData('post')(space.items);
  const pages = getData('page')(space.items);

  save(statiq(pages));
  save(individual(posts));
  save(index(posts));
  tag(posts);
});
