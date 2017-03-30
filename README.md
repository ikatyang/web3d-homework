# web3d-homework

[![build](https://travis-ci.org/ikatyang/web3d-homework.svg)](https://travis-ci.org/ikatyang/web3d-homework)

web3d homework using three.js

## Development

require `Node.js@>=6`

#### Setup

```sh
npm install
```

#### Generate gh-pages

```sh
npm run build
```

#### Preview gh-pages

```sh
npm run preview
```

## Structure

```sh
src/
  homeworks/
    hw${HOMEWORK_ID}/
      index.js
      index.pug
  resources/
  templates/
  index.pug
```

```sh
gh-pages/
  homeworks/
    hw${HOMEWORK_ID}/
      index.html
      bundle.js
  resources/
  index.html
```
