import { BardFile } from './bard-file.js';
import { FileDrop } from './file-drop.js';
import { ProgressBar } from './progress-bar.js';
import { UploadedFile } from './uploaded-file.js';
export { getAssetPath, setAssetPath, setNonce, setPlatformOptions } from '@stencil/core/internal/client';

const defineCustomElements = (opts) => {
    if (typeof customElements !== 'undefined') {
        [
            BardFile,
            FileDrop,
            ProgressBar,
            UploadedFile,
        ].forEach(cmp => {
            if (!customElements.get(cmp.is)) {
                customElements.define(cmp.is, cmp, opts);
            }
        });
    }
};

export { defineCustomElements };

//# sourceMappingURL=index.js.map