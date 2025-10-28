import { BardFile } from './bard-file.js';
import { FilePreview } from './file-preview.js';
import { UploadedFile } from './uploaded-file.js';
export { getAssetPath, render, setAssetPath, setNonce, setPlatformOptions } from '@stencil/core/internal/client';

const globalScripts = () => {};
const globalStyles = "";

globalScripts();
const defineCustomElements = (opts) => {
    if (typeof customElements !== 'undefined') {
        [
            BardFile,
            FilePreview,
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

//# sourceMappingURL=index.js.map