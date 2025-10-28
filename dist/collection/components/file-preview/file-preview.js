import { Host, h } from "@stencil/core";
export class FilePreview {
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
                "getter": false,
                "setter": false,
                "reflect": true,
                "attribute": "src"
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
                "getter": false,
                "setter": false,
                "reflect": true,
                "attribute": "filetype"
            }
        };
    }
}
const toggle = function () { this.paused ? this.play() : this.pause(); return false; };
//# sourceMappingURL=file-preview.js.map
