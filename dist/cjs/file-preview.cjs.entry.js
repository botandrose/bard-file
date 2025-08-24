'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7b8f0eb1.js');

const filePreviewCss = ":host{display:block;font-size:13px}img,video{max-width:100%;margin-top:10px}";

const FilePreview = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.src = undefined;
        this.filetype = undefined;
    }
    render() {
        return (index.h(index.Host, { class: this.computeClass() }, this.isImage() && index.h("img", { src: this.src }), this.isVideo() && index.h("video", { src: this.src, onClick: toggle }), this.isOther() && "This file does not offer a preview", index.h("slot", null)));
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

exports.file_preview = FilePreview;

//# sourceMappingURL=file-preview.cjs.entry.js.map