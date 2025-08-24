import { newSpecPage } from "@stencil/core/testing";
import { ProgressBar } from "./progress-bar";
describe('progress-bar', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [ProgressBar],
            html: `<progress-bar percent="33">testing</progress-bar>`,
        });
        expect(page.root).toEqualHtml(`
      <progress-bar percent="33">
        <mock:shadow-root>
          <div class="bar" style="width: 33%;"></div>
          <span class="content">
            <slot></slot>
          </span>
        </mock:shadow-root>
        testing
      </progress-bar>
    `);
    });
});
//# sourceMappingURL=progress-bar.spec.js.map
