/*jslint node: true, esversion: 6 */
"use strict";


/**
 * LIGHTWEIGHT ADVENTURES
 * @version 1.0.0
 * @author Pixels & Bytes
 *
 *         Run: browserify main.js -o bundle.js
 *
 * @requires jQuery
 * @requires dropcap.js
 */

// SEPARTE INTO INDIVIDUAL FILES AND BROWSERIFY INTO BUNDLE

// THE REQUIREMENTS
const $ = require('jquery');
const Dropcap = require("dropcap.js");



// DROPCAPS
$(function () {
  const addSpan = () => $('.post-content, .page-content').find('p:first').html(
    (i, html) => html.replace(/^[^a-zA-Z]*([a-zA-Z])/g, '<span class="dropcap">$1</span>')
  );

  const dropcap = () => {
    const $dropcaps = document.querySelectorAll('.dropcap');
    window.Dropcap.layout($dropcaps, 2);
  };

  addSpan();
  dropcap();
});


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


// GOOGLE MAPS
function initialize() {

    // Locations wot we az been to
    var portPenrhyn = new google.maps.LatLng(53.233829, -4.110335),
        havenMarina = new google.maps.LatLng(52.474304, 1.718304),
        portForum = new google.maps.LatLng(41.412926, 2.227746),
        offPalamos = new google.maps.LatLng(41.786325, 3.139241),
        palamos = new google.maps.LatLng(41.842627, 3.135153);

    // Visual centre of map
    var mapCenter = palamos; //new google.maps.LatLng(45.466225, 9.182882);

    // Where we iz now
    var myLatlng = palamos;

    // Custom image for pin
    var imagePath = 'http://www.jamesnew.co.uk/googlePin.png';

    // Set options for zoom level map center and map type
    var mapOptions = {
        zoom: 7,
        center: mapCenter,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // Add map to page
    var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

    // road transport in blue
    var roadTransport = [portPenrhyn,havenMarina,portForum];
    var roadPath = new google.maps.Polyline({
      path:roadTransport,
      strokeColor:"#207896",
      strokeOpacity:0.8,
      strokeWeight:2
      });

    roadPath.setMap(map);

    // sail tracks in red
    var sailDestinations = [portForum, offPalamos, palamos];
    var sailWake = new google.maps.Polyline({
        path: sailDestinations,
        strokeColor: "#D9453D",
        strokeOpacity:0.8,
        strokeWeight:2
    });

    sailWake.setMap(map);

    //Callout Content
    var contentString = 'Dreva';
    //Set window width + content
    var infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 500
    });

    //Add Marker
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        // icon: imagePath,
        // title: 'image title'
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
    });

    //Resize Function
    google.maps.event.addDomListener(window, "resize", function() {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
    });
}

google.maps.event.addDomListener(window, 'load', initialize);


// GOOGLE ANALYTICS
// Set your account ID appropriately by replacing UA-XXXXX-X
var _gaq = [['_setAccount', 'UA-XXXXX-X'], ['_trackPageview']];
(function (d, t) {
  var g = d.createElement(t),
    s = d.getElementsByTagName(t)[0];
  g.src = ('https:' == location.protocol ? '//ssl' : '//www') + '.google-analytics.com/ga.js';
  s.parentNode.insertBefore(g, s);
}(document, 'script'));
