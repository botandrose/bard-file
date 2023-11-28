import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'bard-file',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      dir: 'dist/components',
      customElementsExportBehavior: 'single-export-module',
      isPrimaryPackageOutputTarget: true,
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      copy: [
        { src: 'images' }
      ]
      serviceWorker: null, // disable service workers
    },
  ],
  testing: {
    browserHeadless: "new",
    useESModules: true,
  },
  validatePrimaryPackageOutputTarget: true,
};
