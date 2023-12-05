import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const filePreviewCss = ":host{display:block}img,video{max-width:100%}";

const FilePreview = /*@__PURE__*/ proxyCustomElement(class FilePreview extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.src = undefined;
        this.filetype = undefined;
    }
    render() {
        return (h(Host, { class: this.computeClass() }, this.isImage() && h("img", { src: this.src }), this.isVideo() && h("video", { src: this.src, onClick: toggle }), this.isOther() && "This file does not offer a preview", h("slot", null)));
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
}, [1, "file-preview", {
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