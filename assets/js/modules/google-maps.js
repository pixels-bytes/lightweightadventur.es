/*jslint node: true, esversion: 6 */
"use strict";


/**
 * GOOGLE MAPS FOR LIGHTWEIGHT ADVENTURES
 * @version 1.0.0
 *          @author Pixels & Bytes
 *
 * @requires google-maps
 */


// NEEDS PERSONAL API KEY

// THE REQUIREMENTS
const googleMapsLoader = require('google-maps');


// GOOGLE MAPS
googleMapsLoader.load(function (google) {

    // Locations wot we az been to
    const portPenrhyn = new google.maps.LatLng(53.233829, -4.110335);
    const havenMarina = new google.maps.LatLng(52.474304, 1.718304);
    const portForum   = new google.maps.LatLng(41.412926, 2.227746);
    const offPalamos  = new google.maps.LatLng(41.786325, 3.139241);
    const palamos     = new google.maps.LatLng(41.842627, 3.135153);

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
    var roadTransport = [portPenrhyn, havenMarina, portForum];
    var roadPath = new google.maps.Polyline({
      path: roadTransport,
      strokeColor: "#207896",
      strokeOpacity: 0.8,
      strokeWeight: 2
    });

    roadPath.setMap(map);

    // sail tracks in red
    var sailDestinations = [portForum, offPalamos, palamos];
    var sailWake = new google.maps.Polyline({
      path: sailDestinations,
      strokeColor: "#D9453D",
      strokeOpacity: 0.8,
      strokeWeight: 2
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

    google.maps.event.addListener(marker, 'click', function () {
      infowindow.open(map, marker);
    });

    //Resize Function
    google.maps.event.addDomListener(window, "resize", function () {
      var center = map.getCenter();
      google.maps.event.trigger(map, "resize");
      map.setCenter(center);
    });

    google.maps.event.addDomListener(window, 'load', initialize);
  });

