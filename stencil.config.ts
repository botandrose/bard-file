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
      type: 'docs-readme',
    },
  ],
  devServer: {
    reloadStrategy: 'pageReload',
    root: '/home/micah/work/bard-file/dist',
  },
  testing: {
    browserHeadless: "new",
    useESModules: true,
  },
  validatePrimaryPackageOutputTarget: true,
};
