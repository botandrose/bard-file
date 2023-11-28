import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'bard-file',
  outputTargets: [
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'single-export-module',
      isPrimaryPackageOutputTarget: true,
    },
    {
      type: 'docs-readme',
    },
  ],
  testing: {
    browserHeadless: "new",
    useESModules: true,
  },
  validatePrimaryPackageOutputTarget: true,
};
