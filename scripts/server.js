const fs = require('fs');
const express = require('express');

const app = express();
const port = +process.argv[2] || 8000;

app.param('id', (req, res, next) => {
  next();
});

app.get('/homeworks/:id/', (req, res) => {
  const content = fs.readFileSync(`./gh-pages${req.path}index.html`, 'utf8')
    .replace('</body>', `<script src="${process.env.BROWSER_REFRESH_URL}"></script></body>`);
  res.send(content);
});

app.use(express.static('./gh-pages'));

app.listen(port, () => {
  console.log(`listen on port ${port}`);
  if (process.send) {
    process.send('online');
  }
});
