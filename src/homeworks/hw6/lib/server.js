/* eslint-disable
  ,import/no-extraneous-dependencies
  ,no-console
  ,no-use-before-define
  ,comma-dangle
*/

const fs = require('fs');
const pug = require('pug');
const bodyParser = require('body-parser');
const express = require('express');
const { locals, options } = require('../../../../scripts/constants');
const browserify = require('browserify');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (request, response) => {
  const avatars = fs.readdirSync(path.resolve(__dirname, '../../../resources/avatars')).map(filename => path.basename(filename, '.png'));
  const filenames = fs.readdirSync(`${__dirname}/temp`).map(filename => path.basename(filename, '.json')).reverse();
  response.send(pug.renderFile(`${__dirname}/index.pug`, Object.assign({}, locals, options, { homeworkId: '6', avatars, filenames })));
});

app.get('/client.js', (request, response) => {
  browserify(`${__dirname}/client.js`)
    .transform('babelify', { presets: [path.resolve(__dirname, '../node_modules/babel-preset-env')] })
    .bundle()
    .pipe(response);
});

app.use('/resources', express.static(`${__dirname}/../../../resources`));

app.post('/save', (request, response) => {
  const { data, username } = request.body;
  const date = new Date();
  const timestamp = (date.getFullYear() * 1e10)
                  + ((date.getMonth() + 1) * 1e8)
                  + (date.getDate() * 1e6)
                  + (date.getHours() * 1e4)
                  + (date.getMinutes() * 1e2)
                  + (date.getSeconds() * 1e0);
  const filename = `${timestamp}-${username}`;
  fs.writeFileSync(getFilename(filename), data);
  response.send(JSON.stringify({ filename }));
});

app.get('/load', (request, response) => {
  const { filename } = request.query;
  response.send(fs.readFileSync(getFilename(filename)));
});

const port = +process.argv[2] || 8000;
app.listen(port, () => {
  console.log(`listen on port ${port}`);
});

function getFilename(username) {
  return `${__dirname}/temp/${username}.json`;
}
