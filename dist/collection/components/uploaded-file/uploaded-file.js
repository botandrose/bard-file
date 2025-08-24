import { Host, h } from "@stencil/core";
import DirectUploadController from "./direct-upload-controller";
import Max from "./max";
import Accepts from "./accepts";
import Extensions from "./extensions";
import { get } from "rails-request-json";
import { morph, html } from "../../utils/utils";
let uid = 0;
export class UploadedFile {
    el;
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
        this.name = undefined;
        this.accepts = undefined;
        this.max = undefined;
        this.url = undefined;
        this.value = "";
        this.filename = undefined;
        this.src = undefined;
        this.filetype = undefined;
        this.size = undefined;
        this.state = "complete";
        this.percent = 100;
        this.preview = true;
        this.validationMessage = undefined;
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
        return (h(Host, null, h("slot", null), h("figure", null, h("div", { class: "progress-details" }, h("progress-bar", { percent: this.percent, class: this.state }, h("a", { class: "download-link", href: this.src, download: this.filename, onClick: e => e.stopPropagation() }, this.filename)), h("span", { class: "progress-icon" }), h("a", { class: "remove-media", onClick: this.removeClicked, href: "#" }, h("span", null, "Remove media"))), this.preview ? h("file-preview", { src: this.src, filetype: this.filetype }) : '')));
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
                "attribute": "name",
                "reflect": true
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
                "attribute": "accepts",
                "reflect": true
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
                "attribute": "max",
                "reflect": true
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
                "attribute": "url",
                "reflect": true
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
                "attribute": "value",
                "reflect": true,
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
                "attribute": "filename",
                "reflect": true
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
                "attribute": "src",
                "reflect": true
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
                "attribute": "filetype",
                "reflect": true
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
                "attribute": "size",
                "reflect": true
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
                "attribute": "state",
                "reflect": true,
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
                "attribute": "percent",
                "reflect": true,
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
                "attribute": "preview",
                "reflect": true,
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
                "attribute": "validation-message",
                "reflect": false
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
