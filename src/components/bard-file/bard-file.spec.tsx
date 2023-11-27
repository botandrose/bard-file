import { newSpecPage } from '@stencil/core/testing';
import { BardFile } from './bard-file';

describe('bard-file', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BardFile],
      html: `<bard-file></bard-file>`,
    });
    expect(page.root).toEqualHtml(`
      <bard-file>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </bard-file>
    `);
  });
});
