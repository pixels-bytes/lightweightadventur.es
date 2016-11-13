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
 * @requires dotenv
 * @requires fs
 * @requires pug
 * @requires request
 */



// THE REQUIREMENTS
const dotenv  = require('dotenv').config();
const fs = require('fs');
const pug = require('pug');
const request = require('request');
const site = require('../site.json');


// THE REQUEST
const apiKey = encodeURIComponent(process.env.CONTENTFUL_API_KEY);
const spaceId = encodeURIComponent(process.env.CONTENTFUL_SPACE_ID);
const url = 'https://cdn.contentful.com/spaces/' + spaceId + '/entries?access_token=' + apiKey;

const getSpace = url => {
  return new Promise((resolve, reject) => {
    request({
      url: url,
      json: true
    }, (error, response, body) => {
      if (error) {
        reject('Unable to fetch space');
      } else {
        resolve(body.items);
      }
    });
  });
};


// THE ACTION
const index = pug.compileFile('templates/index.pug');
const posts = { site: site, files: [] };

getSpace(url).then((items) => {
  items.forEach(i => {
    posts.files.push(i.fields.title);
  });
  
  fs.writeFileSync('.build/index.html', index(posts));
});