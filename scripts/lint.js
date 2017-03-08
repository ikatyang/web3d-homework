const path = require('path');
const execSync = require('child_process').execSync;

const cwd = process.cwd();
const bin = path.resolve(cwd, './node_modules/.bin');

const lintConfigs = {
  pug: {
    cli: paths => `node ${cwd}/scripts/lint-pug.js ${paths}`,
    paths: [
      './src/!(resources)/**/*.pug',
    ],
  },
  es6: {
    cli: paths => `${bin}/eslint ${paths}`,
    paths: [
      './scripts/**/*.js',
      './src/!(resources)/**/*.js',
    ],
  },
};

let error = false;

const formatPaths = paths => paths.map(x => `"${x}"`).join(' ');
Object.keys(lintConfigs).forEach((key) => {
  const config = lintConfigs[key];
  const paths = formatPaths(config.paths);
  const cli = config.cli(paths);
  try {
    console.log();
    console.log(`> lint-${key}`);
    console.log();
    execSync(cli, {
      stdio: [process.stdin, process.stdout, process.stderr],
    });
  } catch (e) {
    error = true;
  }
});

console.log();
console.log(`> lint: ${error ? 'error' : 'success'}`);
console.log();

process.exit(error ? 1 : 0);
