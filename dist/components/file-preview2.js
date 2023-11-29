import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const filePreviewCss = ":host{display:block}";

const FilePreview = /*@__PURE__*/ proxyCustomElement(class FilePreview extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.src = undefined;
        this.mimetype = undefined;
    }
    render() {
        return (h(Host, { class: this.computeClass() }, this.isImage() && h("img", { src: this.src }), this.isVideo() && h("video", { src: this.src, onClick: toggle }), this.isOther() && "This media does not offer a preview", h("slot", null)));
    }
    computeClass() {
        if (this.isImage())
            return "image-preview";
        if (this.isVideo())
            return "video-preview";
        return "missing-preview";
    }
    isImage() {
        return this.mimetype.startsWith("image/");
    }
    isVideo() {
        return this.mimetype.startsWith("video/");
    }
    isOther() {
        return !this.isImage() && !this.isVideo();
    }
    static get style() { return filePreviewCss; }
}, [1, "file-preview", {
        "src": [1],
        "mimetype": [1]
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