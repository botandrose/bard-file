import { Host, h } from "@stencil/core";
import DirectUploadController from "./direct-upload-controller";
import Max from "./max";
import Accepts from "./accepts";
import Extensions from "./extensions";
import { get } from "rails-request-json";
import { morph, html } from "../../utils/utils";
import "@botandrose/progress-bar";
let uid = 0;
export class UploadedFile {
    el;
    name;
    accepts;
    max;
    url;
    value = "";
    filename;
    src;
    filetype;
    size;
    state = "complete";
    percent = 100;
    preview = true;
    validationMessage;
    removeEvent;
    removeClicked = event => {
        event.stopPropagation();
        event.preventDefault();
        this.controller?.cancel();
        this.removeEvent.emit(this);
    };
    inputTarget;
    controller;
    _file;
    uid;
    constructor() {
        this.uid = uid++;
        this.inputTarget = html(`<input id="input-target-${this.uid}">`);
    }
    componentWillLoad() {
        this.el.appendChild(this.inputTarget);
        this.setMissingFiletype();
    }
    get file() {
        return this._file;
    }
    set file(file) {
        this.src = URL.createObjectURL(file);
        this.filename = file.name;
        this.size = file.size;
        this.state = "pending";
        this.percent = 0;
        this._file = file;
    }
    set signedId(val) {
        if (this.value !== val) {
            get(`/rails/active_storage/blobs/info/${val}`).then(blob => {
                this.src = `/rails/active_storage/blobs/redirect/${val}/${blob.filename}`;
                this.filename = blob.filename;
                this.size = blob.byte_size;
                this.state = "complete";
                this.percent = 100;
                this.value = val;
            });
        }
    }
    setMissingFiletype(_value, _previousValue) {
        if (!this.filetype && this.filename) {
            this.filetype = Extensions.getFileType(this.filename);
        }
    }
    start(_event) {
        this.state = "pending";
        this.percent = 0;
    }
    progress(event) {
        const { progress } = event.detail;
        this.percent = progress;
    }
    error(event) {
        event.preventDefault();
        const { error } = event.detail;
        this.state = "error";
        this.inputTarget.setCustomValidity(error);
    }
    end(_event) {
        if (this.state !== "error") {
            this.state = "complete";
            this.percent = 100;
        }
    }
    render() {
        return (h(Host, { key: 'fcfc0f35f9ea1709fa64840c6e72ad078a67a630' }, h("slot", { key: 'd71052b9e2aa323eeecbf86296e20e9c4df3acf4' }), h("figure", { key: 'aa373e5ded54689c29d07505b19f629a1d687029' }, h("div", { key: '7e84b497f44ad9362c866d30b7a044a44307cbd4', class: "progress-details" }, h("progress-bar", { key: '6775ae55eed138754d8d66e9e2b2d6e0bb477c59', percent: this.percent, class: this.state }, h("a", { key: 'd3f489b8930818c06132ba93a69875409277dbb3', class: "download-link", href: this.src, download: this.filename, onClick: e => e.stopPropagation() }, this.filename)), h("span", { key: '25c6d686db7df4b80e3bfbdcd62ef75bd8c66be5', class: "progress-icon" }), h("a", { key: 'e397f1139d7e565a8aacb35955fe79a2a2bd746d', class: "remove-media", onClick: this.removeClicked, href: "#" }, h("span", { key: '91617315ad71b68fa6e98e1cae979ed1450f96ba' }, "Remove media"))), this.preview ? h("file-preview", { src: this.src, filetype: this.filetype }) : '')));
    }
    componentDidRender() {
        morph(this.inputTarget, `
      <input
        id="input-target-${this.uid}"
        style="opacity: 0.01; width: 1px; height: 1px; z-index: -999; position: absolute;"
        name="${this.name}"
        value="${this.value}"
      >`);
    }
    componentDidLoad() {
        if (this.checkValidity() && this.state == "pending") {
            this.controller = new DirectUploadController(this.el);
            this.controller.dispatch("initialize", { controller: this.controller });
        }
    }
    checkValidity() {
        let errors = [];
        errors.push(...new Accepts(this).errors);
        errors.push(...new Max(this).errors);
        this.inputTarget.setCustomValidity(errors.join(" "));
        this.inputTarget.reportValidity();
        return errors.length === 0;
    }
    static get is() { return "uploaded-file"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["uploaded-file.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["uploaded-file.css"]
        };
    }
    static get properties() {
        return {
            "name": {
                "type": "string",
                "mutable": true,
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
                "attribute": "name"
            },
            "accepts": {
                "type": "string",
                "mutable": true,
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
                "attribute": "accepts"
            },
            "max": {
                "type": "number",
                "mutable": true,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
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
                "attribute": "max"
            },
            "url": {
                "type": "string",
                "mutable": true,
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
                "attribute": "url"
            },
            "value": {
                "type": "string",
                "mutable": true,
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
                "attribute": "value",
                "defaultValue": "\"\""
            },
            "filename": {
                "type": "string",
                "mutable": true,
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
                "attribute": "filename"
            },
            "src": {
                "type": "string",
                "mutable": true,
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
                "mutable": true,
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
            },
            "size": {
                "type": "number",
                "mutable": true,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
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
                "attribute": "size"
            },
            "state": {
                "type": "string",
                "mutable": true,
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
                "attribute": "state",
                "defaultValue": "\"complete\""
            },
            "percent": {
                "type": "number",
                "mutable": true,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
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
                "attribute": "percent",
                "defaultValue": "100"
            },
            "preview": {
                "type": "boolean",
                "mutable": true,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
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
                "attribute": "preview",
                "defaultValue": "true"
            },
            "validationMessage": {
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
                "reflect": false,
                "attribute": "validation-message"
            }
        };
    }
    static get events() {
        return [{
                "method": "removeEvent",
                "name": "uploaded-file:remove",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "any",
                    "resolved": "any",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "filename",
                "methodName": "setMissingFiletype"
            }];
    }
    static get listeners() {
        return [{
                "name": "direct-upload:initialize",
                "method": "start",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "direct-upload:start",
                "method": "start",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "direct-upload:progress",
                "method": "progress",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "direct-upload:error",
                "method": "error",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "direct-upload:end",
                "method": "end",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=uploaded-file.js.map
