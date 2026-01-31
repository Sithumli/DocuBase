#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import prompts from 'prompts';
import pc from 'picocolors';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cliPkgPath = path.resolve(__dirname, '..', 'package.json');
const cliPkg = fs.readJsonSync(cliPkgPath);
const CLI_VERSION = cliPkg.version;

async function main() {
  console.log();
  console.log(pc.bold(pc.cyan('create-docubase')) + ' - Create a new DocuBase documentation site');
  console.log();

  let projectName = process.argv[2];

  if (!projectName) {
    const response = await prompts({
      type: 'text',
      name: 'projectName',
      message: 'Project name:',
      initial: 'my-docs',
      validate: (value) => {
        if (!value) return 'Project name is required';
        if (!/^[a-z0-9-_]+$/i.test(value)) {
          return 'Project name can only contain letters, numbers, hyphens, and underscores';
        }
        return true;
      }
    });

    if (!response.projectName) {
      console.log(pc.red('Operation cancelled'));
      process.exit(1);
    }

    projectName = response.projectName;
  }

  const targetDir = path.resolve(process.cwd(), projectName);
  const templateDir = path.resolve(__dirname, '..', 'template');

  if (fs.existsSync(targetDir)) {
    const files = fs.readdirSync(targetDir);
    if (files.length > 0) {
      const response = await prompts({
        type: 'confirm',
        name: 'overwrite',
        message: `Directory "${projectName}" is not empty. Continue anyway?`,
        initial: false
      });

      if (!response.overwrite) {
        console.log(pc.red('Operation cancelled'));
        process.exit(1);
      }
    }
  }

  console.log();
  console.log(`Creating project in ${pc.cyan(targetDir)}...`);

  try {
    await fs.copy(templateDir, targetDir);
  } catch (err) {
    console.error(pc.red('Failed to copy template:'), err.message);
    process.exit(1);
  }

  const pkgPath = path.join(targetDir, 'package.json');
  try {
    const pkg = await fs.readJson(pkgPath);
    pkg.name = projectName;
    await fs.writeJson(pkgPath, pkg, { spaces: 2 });
  } catch (err) {
    console.error(pc.red('Failed to update package.json:'), err.message);
    process.exit(1);
  }

  const contentConfigPath = path.join(targetDir, 'src', 'content.config.ts');
  try {
    let contentConfig = await fs.readFile(contentConfigPath, 'utf-8');
    contentConfig = contentConfig.replace(/\.\/template\/src\/content\//g, './src/content/');
    await fs.writeFile(contentConfigPath, contentConfig);
  } catch (err) {
  }

  // Pin CDN assets to the installed CLI version
  const constantsPath = path.join(targetDir, 'src', 'types', 'constants.ts');
  try {
    let constants = await fs.readFile(constantsPath, 'utf-8');
    constants = constants.replace(/__DOCUBASE_VERSION__/g, `v${CLI_VERSION}`);
    await fs.writeFile(constantsPath, constants);
  } catch (err) {
  }

  console.log(pc.green('Project created successfully!'));
  console.log();

  const installResponse = await prompts({
    type: 'confirm',
    name: 'install',
    message: 'Install dependencies now?',
    initial: true
  });

  if (installResponse.install) {
    console.log();
    console.log('Installing dependencies...');
    console.log();

    try {
      const userAgent = process.env.npm_config_user_agent || '';
      let pm = 'npm';
      if (userAgent.includes('pnpm')) {
        pm = 'pnpm';
      } else if (userAgent.includes('yarn')) {
        pm = 'yarn';
      }

      execSync(`${pm} install`, { cwd: targetDir, stdio: 'inherit' });
      console.log();
      console.log(pc.green('Dependencies installed successfully!'));
    } catch (err) {
      console.log();
      console.log(pc.yellow('Failed to install dependencies. You can install them manually.'));
    }
  }

  console.log();
  console.log(pc.bold('Next steps:'));
  console.log();
  if (targetDir !== process.cwd()) {
    console.log(`  ${pc.cyan('cd')} ${projectName}`);
  }
  if (!installResponse.install) {
    console.log(`  ${pc.cyan('npm install')}  ${pc.dim('(or pnpm install / yarn)')}`);
  }
  console.log(`  ${pc.cyan('npm run dev')}   ${pc.dim('Start the development server')}`);
  console.log();
  console.log(pc.dim('Happy documenting!'));
  console.log();
}

main().catch((err) => {
  console.error(pc.red('Error:'), err.message);
  process.exit(1);
});
