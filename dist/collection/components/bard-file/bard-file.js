import { Host, h } from "@stencil/core";
import FormController from "./form-controller";
import { UploadedFile } from "../uploaded-file/uploaded-file";
import { morph, html, arrayRemove } from "../../utils/utils";
import "@botandrose/file-drop";
export class BardFile {
    el;
    name;
    directupload;
    multiple = false;
    required = false;
    accepts;
    max;
    preview = true;
    _forceUpdate = false;
    forceUpdate() { this._forceUpdate = !this._forceUpdate; }
    form;
    fileTargetId;
    fileTarget;
    hiddenTargetId;
    hiddenTarget;
    _files = [];
    constructor() {
        this.fileTargetId = this.el.id;
        this.fileTarget = html(`<input id="${this.fileTargetId}">`);
        this.hiddenTargetId = `hidden-target-${this.el.getAttribute("name")}`;
        this.hiddenTarget = html(`<input id="${this.hiddenTargetId}">`);
    }
    componentWillLoad() {
        this.el.removeAttribute("id");
        this.form = this.el.closest("form");
        this.form.addEventListener("reset", () => this.reset());
        FormController.instance(this.form);
        const existingFiles = Array.from(this.el.children).filter(e => e.tagName == "UPLOADED-FILE");
        if (existingFiles.length > 0)
            this.files = existingFiles;
    }
    // Methods
    get files() {
        return this._files;
    }
    set files(val) {
        this._files = val;
        if (!this.multiple)
            this._files = this._files.slice(-1);
        this.forceUpdate();
        this.fireChangeEvent();
    }
    get value() {
        return this.files.map(e => e.value);
    }
    set value(val) {
        const newValue = val || [];
        if (JSON.stringify(this.value) !== JSON.stringify(newValue)) { // this is insane. javascript is fucking garbage.
            this.files = newValue.map(signedId => Object.assign(new UploadedFile(), {
                name: this.name,
                preview: this.preview,
                signedId,
            }));
        }
    }
    reset() {
        this.value = [];
    }
    fileTargetChanged(event) {
        if (event.target !== this.fileTarget)
            return;
        this.files.push(...Array.from(this.fileTarget.files).map(file => Object.assign(new UploadedFile(), {
            name: this.name,
            preview: this.preview,
            url: this.directupload,
            accepts: this.accepts,
            max: this.max,
            file,
        })));
        this.files = this.files;
        this.fileTarget.value = null;
    }
    removeUploadedFile(event) {
        arrayRemove(this.files, event.detail);
        this.files = this.files;
    }
    fireChangeEvent() {
        requestAnimationFrame(() => this.el.dispatchEvent(new Event("change", { bubbles: true })));
    }
    // Rendering
    render() {
        return (h(Host, { key: 'ab3a5bae8e654113956ee0eb467443dcdb0adb1a' }, h("file-drop", { key: 'ae3c0de783a09f595ab64ac447908e11b4e2a712', for: this.fileTargetId, onClick: () => this.fileTarget.click() }, h("p", { key: '2d68ab77057e2cf0520d2da17f6b5185568baf33', part: "title" }, h("strong", { key: '31718028c7aee521f3f79ad5d2b975ed9e9732ce' }, "Choose ", this.multiple ? "files" : "file", " "), h("span", { key: 'ef5d6e2aff3e4d460ce4319a14f33dceac9a836b' }, "or drag ", this.multiple ? "them" : "it", " here.")), h("div", { key: 'a03c162469b324f159934de66dbc813f16b4bbf6', class: `media-preview ${this.multiple ? '-stacked' : ''}` }, h("slot", { key: '7b03028a371dafa4513594134fc55a222ea6e6cc' })))));
    }
    componentDidRender() {
        morph(this.fileTarget, `
      <input id="${this.fileTargetId}"
        type="file"
        ${this.multiple ? "multiple" : ""}
        ${this.required && this.files.length === 0 ? "required" : ""}
        style="opacity: 0.01; width: 1px; height: 1px; z-index: -999"
      >`);
        morph(this.hiddenTarget, `
      <input id="${this.hiddenTargetId}"
        type="hidden"
        name="${this.name}"
        ${this.files.length > 0 ? "disabled" : ""}
      >`);
        const wrapper = document.createElement("div");
        // Clear wrapper and append children (replaceChildren polyfill)
        while (wrapper.firstChild) {
            wrapper.removeChild(wrapper.firstChild);
        }
        wrapper.appendChild(this.fileTarget);
        wrapper.appendChild(this.hiddenTarget);
        this.files.forEach(file => wrapper.appendChild(file));
        morph(this.el, wrapper, { childrenOnly: true });
    }
    // Validations
    checkValidity() {
        return this.fileTarget.checkValidity();
    }
    setCustomValidity(msg) {
        this.fileTarget.setCustomValidity(msg);
    }
    reportValidity() {
        this.fileTarget.reportValidity();
    }
    get validationMessage() {
        return this.fileTarget.validationMessage;
    }
    static get is() { return "bard-file"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["bard-file.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["bard-file.css"]
        };
    }
    static get properties() {
        return {
            "name": {
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
                "attribute": "name"
            },
            "directupload": {
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
                "attribute": "directupload"
            },
            "multiple": {
                "type": "boolean",
                "mutable": false,
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
                "reflect": false,
                "attribute": "multiple",
                "defaultValue": "false"
            },
            "required": {
                "type": "boolean",
                "mutable": false,
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
                "reflect": false,
                "attribute": "required",
                "defaultValue": "false"
            },
            "accepts": {
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
                "attribute": "accepts"
            },
            "max": {
                "type": "number",
                "mutable": false,
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
                "reflect": false,
                "attribute": "max"
            },
            "preview": {
                "type": "boolean",
                "mutable": false,
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
                "reflect": false,
                "attribute": "preview",
                "defaultValue": "true"
            }
        };
    }
    static get states() {
        return {
            "_forceUpdate": {}
        };
    }
    static get elementRef() { return "el"; }
    static get listeners() {
        return [{
                "name": "change",
                "method": "fileTargetChanged",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "uploaded-file:remove",
                "method": "removeUploadedFile",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "direct-upload:end",
                "method": "fireChangeEvent",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=bard-file.js.map
