/*jslint node: true, esversion: 6 */
"use strict";


/**
 * LIGHTWEIGHT ADVENTURES SITE BUILDER
 * @version 1.0.0
 * @author Pixels & Bytes
 *
 * @description Built with myriad technologies
 *              - Heavy lifting: Node.js
 *              - CMS: Contentful
 *              - VCS: Github
 *              – Hosting: Netlify
 *
 * @requires contentful
 * @requires dotenv
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
const contentful = require('contentful');
const dotenv     = require('dotenv').config();
const md         = require('markdown-it')({ html: true, linkify: true, typographer: true });
const fs         = require('fs');
const moment     = require('moment');
const path       = require('./paths');
const rename     = require('rename');
const site       = require('../site.json');
const template   = require('./templates');


// THE SETTINGS
const BLOG   = true;
const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_API_KEY
});


// IO FILTH
const saveFile = x => fs.writeFileSync(x.buildpath, x.file);
const save = _.map(saveFile);


// OH SO PURE
const byDate = (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime();
const byDateDesc = (a, b) => byDate(b, a);
const flatUniq = _.comp(_.uniq, _.flatten);
const collectUniq = (p) => _.comp(flatUniq, _.map(_.prop(p)));
const somePropEq = p => t => _.comp(_.some(_.eq(t)), _.prop(p));


// CUSTOM FUNCTIONS FOR THIS PROBLEM
const getData = type => _.comp(_.map(i => i.fields), _.filter(i => i.sys.contentType.sys.id == type));

const makeTag = p => files => tag => ({
  title: tag.fields.title,
  slug: tag.fields.slug,
  posts: _.filter(somePropEq(p)(tag))(files)
});

const noYear = x => { return x.date = moment(x.date).format('Do MMM'), x; };

const makeArchive = files => yr => ({
  // Maybe need to set x.date = moment(x.date) at the beginning to stop ISO error
  year: yr,
  posts: _.comp(_.map(noYear), _.filter(p => moment(p.date).year() === yr))(files)
});

const hash = p => xs => ([{ buildpath: p, file: { files: xs, site: site }}]);

const genPath = blog => x => {
  return x.buildpath = rename((blog ? path.BLOG : path.BUILD) + x.slug, {
    extname: '.html'
  }), x;
};

const applyT = t => x => { return x.file = t(x.file), x; };
const markdown = x => { return x.content = md.render(x.content), x; };
const prettyDate = x => { return x.date = moment(x.date).format('Do MMMM, YYYY'), x; };


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
  hash(path.INDEX),
  _.map(markdown),
  _.map(prettyDate),
  _.sort(byDateDesc),
  _.map(_.dupe)
);

const tag = _.comp(
  _.map(applyT(template.TAG_ARCHIVE)),
  hash(path.TAG_ARCHIVE),
  _.S(_.B(_.map)(makeTag('tags')))(collectUniq('tags')),
  _.map(prettyDate),
  _.sort(byDateDesc),
  _.map(_.dupe)
);

const cat = _.comp(
  _.map(applyT(template.CAT_ARCHIVE)),
  hash(path.CAT_ARCHIVE),
  _.S(_.B(_.map)(makeTag('categories')))(collectUniq('categories')),
  _.map(prettyDate),
  _.sort(byDateDesc),
  _.map(_.dupe)
);

const archive = _.comp(
  _.map(applyT(template.ARCHIVE)),
  hash(path.ARCHIVE),
  _.S(_.B(_.map)(makeArchive))(_.comp(flatUniq, _.map(i => moment(i.date).year()))),
  _.sort(byDateDesc),
  _.map(_.dupe)
);


// MAIN PROGRAM
client.getEntries().then((space) => {
  const posts = getData('post')(space.items);
  const pages = getData('page')(space.items);

  save(statiq(pages));
  save(individual(posts));
  save(index(posts));
  save(tag(posts));
  save(cat(posts));
  save(archive(posts));
});
