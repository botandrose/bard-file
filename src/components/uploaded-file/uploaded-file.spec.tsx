// Mock rails-request-json to avoid ES module issues
jest.mock('rails-request-json', () => ({
  get: jest.fn(() => Promise.resolve({}))
}));

import { newSpecPage } from '@stencil/core/testing';
import { UploadedFile } from './uploaded-file';

describe('uploaded-file', () => {

  it('renders', async () => {
    const page = await newSpecPage({
      components: [UploadedFile],
      html: `<uploaded-file></uploaded-file>`,
    });
    
    // Just check that it renders without error
    expect(page.root.tagName).toBe('UPLOADED-FILE');
  });
});
