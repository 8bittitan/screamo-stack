const { execSync } = require('child_process');
const crypto = require('crypto');
const fs = require('fs/promises');
const path = require('path');
const sort = require('sort-package-json');

function escapeRegExp(string) {
  // $& means the whole matched string
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getRandomString(length) {
  return crypto.randomBytes(length).toString('hex');
}

async function main({ rootDirectory }) {
  const README_PATH = path.join(rootDirectory, 'README.md');
  const EXAMPLE_ENV_PATH = path.join(rootDirectory, '.env.example');
  const ENV_PATH = path.join(rootDirectory, '.env');
  const PACKAGE_JSON_PATH = path.join(rootDirectory, 'package.json');

  const REPLACER = 'screamo-stack-template';

  const DIR_NAME = path.basename(rootDirectory);
  const SUFFIX = getRandomString(2);

  const APP_NAME = (DIR_NAME + '-' + SUFFIX)
    // get rid of anything that's not allowed in an app name
    .replace(/[^a-zA-Z0-9-_]/g, '-');

  const [readme, env, packageJson] = await Promise.all([
    fs.readFile(README_PATH, 'utf-8'),
    fs.readFile(EXAMPLE_ENV_PATH, 'utf-8'),
    fs.readFile(PACKAGE_JSON_PATH, 'utf-8'),
  ]);

  const newEnv = env.replace(
    /^SESSION_SECRET=.*$/m,
    `SESSION_SECRET="${getRandomString(16)}"`,
  );

  const newReadme = readme.replace(
    new RegExp(escapeRegExp(REPLACER), 'g'),
    APP_NAME,
  );

  const newPackageJson =
    JSON.stringify(
      sort({ ...JSON.parse(packageJson), name: APP_NAME }),
      null,
      2,
    ) + '\n';

  await Promise.all([
    fs.writeFile(README_PATH, newReadme),
    fs.writeFile(ENV_PATH, newEnv),
    fs.writeFile(PACKAGE_JSON_PATH, newPackageJson),
    fs.copyFile(
      path.join(rootDirectory, 'remix.init', 'gitignore'),
      path.join(rootDirectory, '.gitignore'),
    ),
    fs.rm(path.join(rootDirectory, '.github/ISSUE_TEMPLATE'), {
      recursive: true,
    }),
    fs.rm(path.join(rootDirectory, '.github/PULL_REQUEST_TEMPLATE.md')),
    fs.rm(path.join(rootDirectory, 'package-lock.json')),
  ]);

  console.log('Running setup script');

  execSync(`npm run setup`, { stdio: 'inherit', cwd: rootDirectory });

  console.log(
    `
    Deploy script finished!

    - You're now ready to rock and roll 🤘
      npm run dev
      
    (remix.init directory can safely be removed)
    `.trim(),
  );
}

module.exports = main;
