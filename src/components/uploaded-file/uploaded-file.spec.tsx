import { newSpecPage } from '@stencil/core/testing';
import { UploadedFile } from './uploaded-file';

describe('uploaded-file', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [UploadedFile],
      html: `<uploaded-file></uploaded-file>`,
    });
    expect(page.root).toEqualHtml(`
      <uploaded-file>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </uploaded-file>
    `);
  });
});
