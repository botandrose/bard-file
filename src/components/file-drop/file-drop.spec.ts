import { newSpecPage } from '@stencil/core/testing';
import { FileDrop } from './file-drop';

describe('file-drop', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [FileDrop],
      html: '<file-drop></file-drop>',
    });
    expect(root).toEqualHtml(`
      <file-drop>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </file-drop>
    `);
  });

  it('renders with values', async () => {
    const { root } = await newSpecPage({
      components: [FileDrop],
      html: `<file-drop target="input">
        <input type="file" id="input">
      </file-drop>`,
    });
    expect(root).toEqualHtml(`
      <file-drop target="input">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        <input type="file" id="input">
      </file-drop>
    `);
  });
});
