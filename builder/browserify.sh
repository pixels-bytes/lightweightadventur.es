#!/bin/bash

set -o errexit # Exit on error

#build js dependencies
browserify -r jquery -r dropcap.js -r google-maps > .build/assets/js/vendor.js
browserify -x jquery -x dropcap.js assets/js/modules/nav-toggle.js assets/js/modules/embedly.js assets/js/modules/google-maps.js assets/js/modules/dropcaps.js > .build/assets/js/app.js
