/*jslint node: true, esversion: 6 */
"use strict";


/**
 * EMBEDLY FOR LIGHTWEIGHT ADVENTURES
 * @version 1.0.0
 * @author Pixels & Bytes

 *
 * @requires jquery
 * @requires dropcap.js
 */



// EMBEDLY
(function (w, d) {
  var id = 'embedly-platform',
    n = 'script';
  if (!d.getElementById(id)) {
    w.embedly = w.embedly || function () {
      (w.embedly.q = w.embedly.q || []).push(arguments);
    };
    var e = d.createElement(n);
    e.id = id;
    e.async = 1;
    e.src = ('https:' === document.location.protocol ? 'https' : 'http') + '://cdn.embedly.com/widgets/platform.js';
    var s = d.getElementsByTagName(n)[0];
    s.parentNode.insertBefore(e, s);
  }
})(window, document);
