import { newE2EPage } from '@stencil/core/testing';

describe('file-preview', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<file-preview></file-preview>');

    const element = await page.find('file-preview');
    expect(element).toHaveClass('hydrated');
  });
});
