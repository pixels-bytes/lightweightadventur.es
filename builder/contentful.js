/*jslint node: true, esversion: 6 */
"use strict";


/**
 * LIGHTWEIGHT ADVENTURES CONTENTFUL CLIENT
 * @version 1.0.0
 * @author Pixels & Bytes
 *
 * @requires dotenv
 * @requires contentful
 *
 * @exports getSpace()
 */



// THE REQUIREMENTS
const dotenv     = require('dotenv').config();
const contentful = require('contentful');


// THE CLIENT
const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_API_KEY
});

module.exports.getSpace = () => client.getEntries();
