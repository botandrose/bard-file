import { Host, h } from "@stencil/core";
export class FilePreview {
    constructor() {
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
    static get is() { return "file-preview"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["file-preview.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["file-preview.css"]
        };
    }
    static get properties() {
        return {
            "src": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "attribute": "src",
                "reflect": true
            },
            "filetype": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "attribute": "filetype",
                "reflect": true
            }
        };
    }
}
const toggle = function () { this.paused ? this.play() : this.pause(); return false; };
//# sourceMappingURL=file-preview.js.map
