const Spectron = require('spectron');
const path = require('path');
const fs = require('fs');
const os = require('os');
const rimraf = require('rimraf');

const DEFAULT_OPTIONS = {
  skipOnboarding: true,
  restartAppAfterEachTest: true,
  clearCollectionAfterEachTest: false,
  noSync: true,
  networkLogging: false,
  pauseIfFailed: false,
  implicitTimeout: 0,
};

const options = Object.assign({}, DEFAULT_OPTIONS);
const appArgs = options.appArgs ? options.appArgs.split(' ') : [];
if (options.networkLogging) appArgs.push('--network-logging');
if (options.noSync) appArgs.push('--nosync');

const dirname = path.join(__dirname, '..', '..', '..', 'test-dist', 'test', 'helpers', 'spectron');
console.log('dirname is ', dirname);
const cacheDir = fs.mkdtempSync(path.join(os.tmpdir(), 'slobs-test'));

const app = new Spectron.Application({
  path: path.join(dirname, '..', '..', '..', '..', 'node_modules', '.bin', 'electron.cmd'),
  args: [
    '--require',
    path.join(dirname, 'context-menu-injected.js'),
    '--require',
    path.join(dirname, 'dialog-injected.js'),
    ...appArgs,
    '.',
  ],
  env: {
    NODE_ENV: 'test',
    SLOBS_CACHE_DIR: cacheDir,
  },
  chromeDriverArgs: [`user-data-dir=${path.join(cacheDir, 'slobs-client')}`],
});

(async function main() {
  // await app.start();
  await app.startChromeDriver();
  console.log('chromedriver started');
  await app.createClient();
  const client = app.client;
  console.log('client created');
  await focusWindow(client, 'main');
  const $skip = await client.$('span=Skip');
  await $skip.waitForExist({ timeout: 10000 });
  console.log('$skip exist');
  await sleep(5000, true);
})();

function sleep(ms, countdown = false) {
  function countdownTick(ms) {
    if (ms < 0) return;
    console.log('sleep', ms);
    setTimeout(() => countdownTick(ms - 1000), 1000);
  }
  if (countdown) countdownTick(ms);

  return new Promise(resolve => setTimeout(resolve, ms));
}

async function focusWindow(client, winIdOrRegexp) {
  console.log('focus window', winIdOrRegexp);
  const count = await client.getWindowCount();

  console.log('total windows', count);
  for (let i = 0; i < count; i++) {
    await windowByIndex(client, i);
    const url = await client.getUrl();
    console.log('check', url);
    if (typeof winIdOrRegexp === 'string') {
      const winId = winIdOrRegexp;
      if (url.includes(`windowId=${winId}`)) return true;
    } else {
      const regex = winIdOrRegexp;
      if (url.match(regex)) return true;
    }
  }
  return false;
}

function windowByIndex(client, index) {
  return client.getWindowHandles().then(function (handles) {
    return client.switchToWindow(handles[index]);
  });
};
