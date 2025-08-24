import { newSpecPage } from '@stencil/core/testing';
import { FilePreview } from './file-preview';

describe('file-preview', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [FilePreview],
      html: `<file-preview></file-preview>`,
    });
    expect(page.root).toEqualHtml(`
      <file-preview class="other">
        <mock:shadow-root>
          This file does not offer a preview
          <slot></slot>
        </mock:shadow-root>
      </file-preview>
    `);
  });
});
