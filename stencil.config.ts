import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'bard-file',
  outputTargets: [
    {
      type: 'dist-custom-elements',
      dir: 'dist/components',
      customElementsExportBehavior: 'bundle',
      isPrimaryPackageOutputTarget: true,
      copy: [
        { src: 'images', dest: 'dist/images/' },
        { src: 'index.html', dest: 'dist/index.html' },
      ]
    },
    {
      type: 'www',
      dir: 'www',
      serviceWorker: null,
    },
    {
      type: 'docs-readme',
    },
  ],
  devServer: {
    reloadStrategy: 'pageReload',
    root: 'www',
  },
  testing: {
    browserHeadless: "new",
    useESModules: true,
    transformIgnorePatterns: [
      "node_modules/(?!(rails-request-json|@botandrose|@rails/request\.js))"
    ],
    testPathIgnorePatterns: ["/node_modules/", "/dist/"],
    setupFilesAfterEnv: ["<rootDir>/jest-setup.js"],
    browserArgs: process.env.CI ? ['--no-sandbox', '--disable-setuid-sandbox'] : []
  },
  validatePrimaryPackageOutputTarget: true,
};
