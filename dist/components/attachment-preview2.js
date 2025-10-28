import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const attachmentPreviewCss = ":host{display:block;font-size:13px}img,video{max-width:100%;margin-top:10px}";

const AttachmentPreview = /*@__PURE__*/ proxyCustomElement(class AttachmentPreview extends HTMLElement {
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
        return (h(Host, { key: '429f17fda03ded975255da6335ba23a663ee662e', class: this.computeClass() }, this.isImage() && h("img", { key: 'daa4e38cb1375db7d8852ab1cb401f048efbbdc7', src: this.src }), this.isVideo() && h("video", { key: '1b7860bc3edf2f4ba4951dd0bd8a88f14db078a0', src: this.src, onClick: toggle }), this.isOther() && "This file does not offer a preview", h("slot", { key: 'b8a894bcc9ae11619d543b20f2bd2ee9167616d8' })));
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
    static get style() { return attachmentPreviewCss; }
}, [257, "attachment-preview", {
        "src": [513],
        "filetype": [513]
    }]);
const toggle = function () { this.paused ? this.play() : this.pause(); return false; };
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["attachment-preview"];
    components.forEach(tagName => { switch (tagName) {
        case "attachment-preview":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, AttachmentPreview);
            }
            break;
    } });
}

export { AttachmentPreview as A, defineCustomElement as d };
//# sourceMappingURL=attachment-preview2.js.map

//# sourceMappingURL=attachment-preview2.js.map