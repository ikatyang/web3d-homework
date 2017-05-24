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

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send(pug.renderFile(`${__dirname}/index.pug`, Object.assign({}, locals, options, { homeworkId: '5' })));
});

app.get('/client.js', (request, response) => {
  response.sendFile(`${__dirname}/client.js`);
});

app.get('/login', (request, response) => {
  const { username } = request.query;
  response.send(JSON.stringify(
    (!username || !/^\w+$/.test(username))
      ? { error: `invalid username: ${username}` }
      : {
        error: null,
        existed: tap(fs.existsSync(getFilename(username)), undefined, () => {
          fs.writeFileSync(getFilename(username), '[]');
        }),
      }
  ));
});

app.use('/resources', express.static(`${__dirname}/../../../resources`));

app.post('/save', (request) => {
  const data = request.body.data;
  const { username } = request.body;
  const filename = getFilename(username);
  fs.writeFileSync(filename, data);
});

app.get('/load', (request, response) => {
  const { username } = request.query;
  const filename = getFilename(username);
  response.send(fs.readFileSync(filename));
});

const port = +process.argv[2] || 8000;
app.listen(port, () => {
  console.log(`listen on port ${port}`);
});

function getFilename(username) {
  return `${__dirname}/temp/${username}.json`;
}

function tap(value, fnTrue, fnFalse) {
  if (value && fnTrue) {
    fnTrue();
  }
  if (!value && fnFalse) {
    fnFalse();
  }
  return value;
}
