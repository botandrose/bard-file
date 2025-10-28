import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const filePreviewCss = ":host{display:block;font-size:13px}img,video{max-width:100%;margin-top:10px}";

const FilePreview = /*@__PURE__*/ proxyCustomElement(class FilePreview extends HTMLElement {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.__attachShadow();
    }
    src;
    filetype;
    render() {
        return (h(Host, { key: '4ac011f2a5a1d7d9130f86014351513b9a42f843', class: this.computeClass() }, this.isImage() && h("img", { key: '7a169a7185eb1494a61a7b3c0f628f9a214bcb39', src: this.src }), this.isVideo() && h("video", { key: 'cd8b3414f65e19a24f8c2ccb55606c7b01fd31ff', src: this.src, onClick: toggle }), this.isOther() && "This file does not offer a preview", h("slot", { key: 'de543ee7457c0685666ed8acac67ba7d2e3631ed' })));
    }
    computeClass() {
        if (this.isImage())
            return "image";
        if (this.isVideo())
            return "video";
        return "other";
    }
    isImage() {
        return this.filetype == "image";
    }
    isVideo() {
        return this.filetype == "video";
    }
    isOther() {
        return !this.isImage() && !this.isVideo();
    }
    static get style() { return filePreviewCss; }
}, [257, "file-preview", {
        "src": [513],
        "filetype": [513]
    }]);
const toggle = function () { this.paused ? this.play() : this.pause(); return false; };
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["file-preview"];
    components.forEach(tagName => { switch (tagName) {
        case "file-preview":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, FilePreview);
            }
            break;
    } });
}

export { FilePreview as F, defineCustomElement as d };
//# sourceMappingURL=file-preview2.js.map

//# sourceMappingURL=file-preview2.js.map