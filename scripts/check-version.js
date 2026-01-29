#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getMainVersion() {
  try {
    const mainPkg = execSync('git show origin/main:package.json', {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe']
    });
    return JSON.parse(mainPkg).version;
  } catch (err) {
    console.log('Could not fetch version from main branch (this might be the first publish)');
    return null;
  }
}

function getCurrentVersion() {
  const pkgPath = path.resolve(__dirname, '..', 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  return pkg.version;
}

function compareVersions(current, main) {
  if (!main) return true;

  const currentParts = current.split('.').map(Number);
  const mainParts = main.split('.').map(Number);

  for (let i = 0; i < 3; i++) {
    if (currentParts[i] > mainParts[i]) return true;
    if (currentParts[i] < mainParts[i]) return false;
  }

  return false;
}

function main() {
  console.log('Checking version bump...\n');

  const currentVersion = getCurrentVersion();
  const mainVersion = getMainVersion();

  console.log(`Current version: ${currentVersion}`);
  console.log(`Main version:    ${mainVersion || '(not found)'}`);
  console.log();

  if (compareVersions(currentVersion, mainVersion)) {
    console.log('Version bump detected. Check passed!');
    process.exit(0);
  } else {
    console.error('ERROR: Version has not been bumped!');
    console.error('');
    console.error('Please update the version in package.json before merging.');
    console.error('');
    console.error('Examples:');
    console.error('  Patch release (bug fixes):     0.0.1 -> 0.0.2');
    console.error('  Minor release (new features):  0.0.1 -> 0.1.0');
    console.error('  Major release (breaking):      0.0.1 -> 1.0.0');
    process.exit(1);
  }
}

main();
