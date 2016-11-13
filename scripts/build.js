const pug = require('pug');
const fs = require('fs');
const site = require('../site.json');

const index = pug.compileFile('templates/layout.pug');
fs.writeFileSync('.build/index.html', index(site));
