const fs = require('fs');
const path = require('path');
const pug = require('pug');
const execSync = require('child_process').execSync;

const cwd = process.cwd();
const bin = path.resolve(cwd, './node_modules/.bin');

const options = { pretty: true };

const inputDir = path.join(cwd, 'src');
const outputDir = path.join(cwd, 'gh-pages');

const indexFile = path.join(inputDir, 'index.pug');
const resourcesDir = path.join(inputDir, 'resources');
const homeworksDir = path.join(inputDir, 'homeworks');
const homeworkNames = fs.readdirSync(homeworksDir);
const homeworkIds = homeworkNames.map(name => name.slice(2));
const homeworkDirs = homeworkNames.map(name => path.join(homeworksDir, name));

const locals = {
  courseAbbr: 'W3D',
  courseName: 'Web3D',
  homeworkId: '',
};

const checkDir = (dirname) => {
  if (fs.existsSync(dirname)) {
    if (!fs.statSync(dirname).isDirectory()) {
      console.log(`Path ${dirname} should be a folder.`);
      process.exit(1);
    }
  } else {
    const superDir = path.resolve(dirname, '../');
    if (fs.existsSync(superDir)) {
      fs.mkdirSync(dirname);
    } else {
      checkDir(superDir);
      checkDir(dirname);
    }
  }
};

homeworkDirs.forEach((homeworkDir, index) => {
  const homeworkName = homeworkNames[index];

  const homeworkOutputDir = homeworkDir.replace(inputDir, outputDir);
  checkDir(homeworkOutputDir);

  console.log();
  console.log(`> build-es5: ${homeworkName}`);
  console.log();

  execSync(`${bin}/browserify ${homeworkDir}/index.js -o ${homeworkOutputDir}/bundle.js -t [ babelify --presets [ es2015 ] ]`, {
    stdio: [process.stdin, process.stdout, process.stderr],
  });
});

const compilePug = (name, pugFile, pugLocals = {}) => {
  console.log();
  console.log(`> build-html: ${name}`);
  console.log();
  fs.writeFileSync(
    pugFile.replace(inputDir, outputDir).replace(/\.pug$/, '.html'),
    pug.renderFile(pugFile, Object.assign({}, options, locals, pugLocals, {
      resources: path.relative(path.dirname(pugFile), resourcesDir).replace(/\\/g, '/'),
    })));
};

compilePug('index', indexFile, { homeworkIds });
homeworkDirs.forEach((homeworkDir, index) => {
  const pugFile = path.join(homeworkDir, 'index.pug');
  const homeworkId = homeworkIds[index];
  const homeworkName = homeworkNames[index];
  compilePug(homeworkName, pugFile, { homeworkId });
});

process.exit(0);
