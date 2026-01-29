import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';

describe('CLI', () => {
  let tempDir: string;
  const templateDir = path.resolve(__dirname, '..', 'template');

  beforeEach(async () => {
    tempDir = path.join(os.tmpdir(), `docubase-test-${Date.now()}`);
    await fs.ensureDir(tempDir);
  });

  afterEach(async () => {
    if (tempDir && await fs.pathExists(tempDir)) {
      await fs.remove(tempDir);
    }
  });

  describe('Template structure', () => {
    it('template directory exists', async () => {
      const exists = await fs.pathExists(templateDir);
      expect(exists).toBe(true);
    });

    it('template has required files', async () => {
      const requiredFiles = [
        'package.json',
        'tsconfig.json',
        'astro.config.mjs',
        'src',
        'public',
      ];

      for (const file of requiredFiles) {
        const filePath = path.join(templateDir, file);
        const exists = await fs.pathExists(filePath);
        expect(exists, `${file} should exist in template`).toBe(true);
      }
    });

    it('template package.json has required scripts', async () => {
      const pkgPath = path.join(templateDir, 'package.json');
      const pkg = await fs.readJson(pkgPath);

      expect(pkg.scripts).toBeDefined();
      expect(pkg.scripts.dev).toBeDefined();
      expect(pkg.scripts.build).toBeDefined();
      expect(pkg.scripts.preview).toBeDefined();
    });

    it('template package.json has required dependencies', async () => {
      const pkgPath = path.join(templateDir, 'package.json');
      const pkg = await fs.readJson(pkgPath);

      expect(pkg.dependencies).toBeDefined();
      expect(pkg.dependencies.astro).toBeDefined();
    });
  });

  describe('Template copying', () => {
    it('copies template to target directory', async () => {
      const targetDir = path.join(tempDir, 'test-project');

      await fs.copy(templateDir, targetDir);

      const exists = await fs.pathExists(targetDir);
      expect(exists).toBe(true);

      const pkgExists = await fs.pathExists(path.join(targetDir, 'package.json'));
      expect(pkgExists).toBe(true);
    });

    it('can update package.json name', async () => {
      const targetDir = path.join(tempDir, 'test-project');
      await fs.copy(templateDir, targetDir);

      const pkgPath = path.join(targetDir, 'package.json');
      const pkg = await fs.readJson(pkgPath);

      pkg.name = 'my-custom-docs';
      await fs.writeJson(pkgPath, pkg, { spaces: 2 });

      const updatedPkg = await fs.readJson(pkgPath);
      expect(updatedPkg.name).toBe('my-custom-docs');
    });

    it('preserves directory structure', async () => {
      const targetDir = path.join(tempDir, 'test-project');
      await fs.copy(templateDir, targetDir);

      const srcExists = await fs.pathExists(path.join(targetDir, 'src'));
      const publicExists = await fs.pathExists(path.join(targetDir, 'public'));

      expect(srcExists).toBe(true);
      expect(publicExists).toBe(true);
    });
  });

  describe('Package validation', () => {
    it('CLI package.json has correct bin entry', async () => {
      const cliPkgPath = path.resolve(__dirname, '..', 'package.json');
      const pkg = await fs.readJson(cliPkgPath);

      expect(pkg.bin).toBeDefined();
      expect(pkg.bin['create-docubase']).toBe('./bin/cli.js');
    });

    it('CLI package.json has correct files entry', async () => {
      const cliPkgPath = path.resolve(__dirname, '..', 'package.json');
      const pkg = await fs.readJson(cliPkgPath);

      expect(pkg.files).toBeDefined();
      expect(pkg.files).toContain('bin');
      expect(pkg.files).toContain('template');
    });

    it('CLI entry point exists', async () => {
      const cliPath = path.resolve(__dirname, '..', 'bin', 'cli.js');
      const exists = await fs.pathExists(cliPath);
      expect(exists).toBe(true);
    });
  });
});
