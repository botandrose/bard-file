import { newSpecPage } from '@stencil/core/testing';
import { FileDrop } from './file-drop';

describe('file-drop', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [FileDrop],
      html: '<file-drop></file-drop>',
    });
    expect(root).toEqualHtml(`
      <file-drop></file-drop>
    `);
  });

  it('renders with values', async () => {
    const { root } = await newSpecPage({
      components: [FileDrop],
      html: `<file-drop for="input">
        <input type="file" id="input">
      </file-drop>`,
    });
    expect(root).toEqualHtml(`
      <file-drop for="input">
        <input type="file" id="input">
      </file-drop>
    `);
  });
});
