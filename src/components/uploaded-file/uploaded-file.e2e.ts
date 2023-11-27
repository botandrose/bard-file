import { newE2EPage } from '@stencil/core/testing';

describe('uploaded-file', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<uploaded-file></uploaded-file>');

    const element = await page.find('uploaded-file');
    expect(element).toHaveClass('hydrated');
  });
});
