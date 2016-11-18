/*jslint node: true, esversion: 6 */
"use strict";



/**
 * DROPCAPJS FOR LIGHTWEIGHT ADVENTURES
 * @version 1.0.0
 * @author Pixels & Bytes
 *
 *         Using Dropcapjs: https://github.com/adobe-webplatform/dropcap.js
 *         Run: browserify dropcaps.js -o bundle.js
 *
 * @requires jquery
 * @requires dropcap.js
 */



// THE REQUIREMENTS
const $ = require("jquery");
const Dropcap = require("dropcap.js");


// jQUERY
$(function () {
  function addSpan() {
    return $('.post-content, .page-content')
      .find('p:first')
      .html(function(i, html) {
      return html.replace(/^[^a-zA-Z]*([a-zA-Z])/g, '<span class="dropcap">$1</span>');
    });
  }

  function dropcap() {
    const $dropcaps = document.querySelectorAll('.dropcap');
    window.Dropcap.layout($dropcaps, 2);
  }

  addSpan();
  dropcap();
});
