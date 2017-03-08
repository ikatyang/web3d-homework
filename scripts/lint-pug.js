const glob = require('glob');
const path = require('path');
const puglint = require('../node_modules/pug-lint/lib/cli');

const bin = path.resolve(process.cwd(), './node_modules/.bin/pug-lint');
const globPattern = process.argv[2];
const filenames = glob.sync(globPattern);

const args = [`${bin}`, ...filenames];
puglint(args);
