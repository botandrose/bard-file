
// Mock rails-request-json to avoid ES module issues
jest.mock('rails-request-json', () => ({
  get: jest.fn(() => Promise.resolve({}))
}));

// Mock @botandrose/file-drop to avoid ES module issues
jest.mock('@botandrose/file-drop', () => ({}));

import { newSpecPage } from '@stencil/core/testing';
import { InputAttachment } from './input-attachment';

describe('input-attachment', () => {

  it('renders', async () => {
    const page = await newSpecPage({
      components: [InputAttachment],
      html: `<form><input-attachment></input-attachment></form>`,
    });
    expect(page.root).toEqualHtml(`
      <input-attachment>
        <mock:shadow-root>
          <file-drop for="">
            <p part="title">
              <strong>Choose file </strong>
              <span>or drag it here.</span>
            </p>
            <div class="media-preview">
              <slot></slot>
            </div>
          </file-drop>
        </mock:shadow-root>
        <input type="file">
        <input id="hidden-target-null" name="undefined" type="hidden">
      </input-attachment>
    `);
  });
});
