import { newE2EPage } from '@stencil/core/testing';

describe('file-drop', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<file-drop></file-drop>');
    const element = await page.find('file-drop');
    expect(element).toHaveClass('hydrated');
  });

  it('assigned dropped files to the targeted input file field', async () => {
  });
});
