import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'bard-file',
  outputTargets: [
    {
      type: 'dist-custom-elements',
      dir: 'dist/components',
      customElementsExportBehavior: 'bundle',
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
