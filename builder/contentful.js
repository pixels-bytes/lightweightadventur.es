/*jslint node: true, esversion: 6 */
"use strict";


/**
 * LIGHTWEIGHT ADVENTURES CONTENTFUL REQUEST
 * @version 1.0.0
 * @author Pixels & Bytes
 *
 * @requires dotenv
 * @requires request
 *
 * @exports getSpace()
 */



// THE REQUIREMENTS
const dotenv  = require('dotenv').config();
const request = require('request');


// THE REQUEST
const apiKey = encodeURIComponent(process.env.CONTENTFUL_API_KEY);
const spaceId = encodeURIComponent(process.env.CONTENTFUL_SPACE_ID);
const url = 'https://cdn.contentful.com/spaces/' + spaceId + '/entries?access_token=' + apiKey;

module.exports.getSpace = () => {
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
