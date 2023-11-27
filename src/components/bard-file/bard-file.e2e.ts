import { newE2EPage } from '@stencil/core/testing';

describe('bard-file', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<bard-file></bard-file>');

    const element = await page.find('bard-file');
    expect(element).toHaveClass('hydrated');
  });
});
