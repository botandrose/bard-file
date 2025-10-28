import { AttachmentFile } from './attachment-file.js';
import { AttachmentPreview } from './attachment-preview.js';
import { InputAttachment } from './input-attachment.js';
export { getAssetPath, render, setAssetPath, setNonce, setPlatformOptions } from '@stencil/core/internal/client';

const globalScripts = () => {};
const globalStyles = "";

globalScripts();
const defineCustomElements = (opts) => {
    if (typeof customElements !== 'undefined') {
        [
            AttachmentFile,
            AttachmentPreview,
            InputAttachment,
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