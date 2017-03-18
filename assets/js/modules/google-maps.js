/*jslint node: true, esversion: 6 */
"use strict";


/**
 * GOOGLE MAPS FOR LIGHTWEIGHT ADVENTURES
 * @version 1.0.0
 *          @author Pixels & Bytes
 *
 * @requires google-maps
 */


// PERSONAL API KEY
const GoogleMapsLoader.KEY = 'AIzaSyABRt5j_SwH0Ro47azmKAiXWJCXsm1vcXo';

// THE REQUIREMENTS
const googleMapsLoader = require('google-maps');


// GOOGLE MAPS
googleMapsLoader.load(function (google) {

    // Locations wot we az been to
    const barseback = new google.maps.LatLng(55.771952, 12.966122);
    const ginesta   = new google.maps.LatLng(41.259900, 1.925085);
    const palamos   = new google.maps.LatLng(41.842627, 3.135153);
    const sitges    = new google.maps.LatLng(41.234966, 1.825519);

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
    var roadTransport = [barseback, ginesta];
    var roadPath = new google.maps.Polyline({
      path: roadTransport,
      strokeColor: "#207896",
      strokeOpacity: 0.8,
      strokeWeight: 2
    });

    roadPath.setMap(map);

    // sail tracks in red
    var sailDestinations = [ginesta, sitges];
    var sailWake = new google.maps.Polyline({
      path: sailDestinations,
      strokeColor: "#D9453D",
      strokeOpacity: 0.8,
      strokeWeight: 2
    });

    sailWake.setMap(map);

    //Callout Content
    var contentString = 'Calypso';
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

