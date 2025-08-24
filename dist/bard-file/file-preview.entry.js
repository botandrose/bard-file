import { r as registerInstance, h, a as Host } from './index-12206424.js';

const filePreviewCss = ":host{display:block;font-size:13px}img,video{max-width:100%;margin-top:10px}";

const FilePreview = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
};
const toggle = function () { this.paused ? this.play() : this.pause(); return false; };
FilePreview.style = filePreviewCss;

export { FilePreview as file_preview };

//# sourceMappingURL=file-preview.entry.js.map