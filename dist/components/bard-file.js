import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { U as UploadedFile } from './uploaded-file2.js';
import { d as defineCustomElement$2 } from './file-drop2.js';

class FormController {
    static forForm(form) {
        return form.bardFileFormController ||= new FormController(form);
    }
    progressContainerTarget;
    dialog;
    element;
    progressTargetMap;
    controllers;
    submitted;
    processing;
    errors;
    constructor(form) {
        this.element = form;
        this.progressTargetMap = {};
        this.controllers = [];
        this.submitted = false;
        this.processing = false;
        this.errors = false;
        this.element.insertAdjacentHTML("beforeend", `<dialog id="form-controller-dialog">
        <div class="direct-upload-wrapper">
          <div class="direct-upload-content">
            <h3>Uploading your media</h3>
            <div id="progress-container"></div>
          </div>
        </div>
      </dialog>`);
        this.dialog = this.element.querySelector("#form-controller-dialog");
        this.progressContainerTarget = this.dialog.querySelector("#progress-container");
        this.element.addEventListener("submit", event => this.submit(event));
        window.addEventListener("beforeunload", event => this.beforeUnload(event));
        this.element.addEventListener("direct-upload:initialize", event => this.init(event));
        this.element.addEventListener("direct-upload:start", event => this.start(event));
        this.element.addEventListener("direct-upload:progress", event => this.progress(event));
        this.element.addEventListener("direct-upload:error", event => this.error(event));
        this.element.addEventListener("direct-upload:end", event => this.end(event));
        this.element.addEventListener("uploaded-file:remove", event => this.removeUploadedFile(event));
    }
    beforeUnload(event) {
        if (this.processing) {
            event.preventDefault();
            return (event.returnValue = "");
        }
    }
    submit(event) {
        event.preventDefault();
        this.submitted = true;
        this.startNextController();
        if (this.processing) {
            this.dialog.showModal();
        }
    }
    startNextController() {
        if (this.processing)
            return;
        const controller = this.controllers.shift();
        if (controller) {
            this.processing = true;
            controller.start(error => {
                if (error) {
                    Array.from(this.element.querySelectorAll("input[type=file]"))
                        .forEach((e) => e.disabled = false);
                }
                this.processing = false;
                this.startNextController();
            });
        }
        else {
            this.submitForm();
        }
    }
    submitForm() {
        if (this.submitted) {
            Array.from(this.element.querySelectorAll("input[type=file]"))
                .forEach((e) => e.disabled = true);
            this.element.submit();
        }
    }
    init(event) {
        const { id, file, controller } = event.detail;
        this.progressContainerTarget.insertAdjacentHTML("beforebegin", `
      <progress-bar id="direct-upload-${id}" class="direct-upload--pending">${file.name}</progress-bar>
    `);
        const progressTarget = document.getElementById(`direct-upload-${id}`);
        this.progressTargetMap[id] = progressTarget;
        this.controllers.push(controller);
        this.startNextController();
    }
    start(event) {
        this.progressTargetMap[event.detail.id].classList.remove("direct-upload--pending");
    }
    progress(event) {
        const { id, progress } = event.detail;
        this.progressTargetMap[id].percent = progress;
    }
    error(event) {
        event.preventDefault();
        const { id, error } = event.detail;
        const target = this.progressTargetMap[id];
        target.classList.add("direct-upload--error");
        target.title = error;
    }
    end(event) {
        this.progressTargetMap[event.detail.id].classList.add("direct-upload--complete");
    }
    removeUploadedFile(event) {
        const uploadedFile = event.detail;
        const id = uploadedFile.controller?.directUpload?.id;
        if (id) {
            document.getElementById(`direct-upload-${id}`).remove();
            delete this.progressTargetMap[id];
        }
    }
}

const bardFileCss = ":host{display:block;padding:25px;color:var(--bard-file-text-color, #000)}:host *{box-sizing:border-box;position:relative}drag-and-drop{display:block;padding:40px;outline-offset:-10px;background:rgba(255,255,255, 0.25);margin:0;text-align:center;transition:all 0.15s;outline:2px dashed rgba(0,0,0,0.25);color:#444;font-size:14px}drag-and-drop.-full{width:100%}.-dragover{background:rgba(255,255,255,0.5);outline:2px dashed rgba(0,0,0,0.25)}.drag-icon{display:block;text-align:center;font-size:4em;font-style:normal}.drag-icon::before{content:\"\";background:url('data:image/svg+xml;utf8,<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 159.9 159.7\" style=\"enable-background:new 0 0 159.9 159.7;\" xml:space=\"preserve\"><g><path d=\"M105.7,109.8c0.4-0.7,0.5-1.1,0.7-1.4c4.1-4.1,8.2-8.3,12.4-12.4c0.6-0.6,1.8-1,2.7-1c6.9,0,13.8-0.1,20.7,0.4 c9.5,0.6,17.4,9.1,17.6,18.6c0.2,8.4,0.2,16.8,0.1,25.2c-0.1,12.1-8.8,20.4-21.2,20.4c-26.7,0-53.5,0-80.2,0c-12.2,0-24.3,0-36.5,0 c-13.2,0-21.7-8.2-21.8-21.4c-0.1-8.3-0.2-16.7,0.2-25c0.5-9.6,8.2-17.2,17.7-17.9c6.8-0.5,13.6-0.3,20.5-0.4 c0.8,0,1.9,0.3,2.5,0.8c4.3,4.2,8.5,8.5,12.7,12.7c0.2,0.2,0.3,0.6,0.5,1.2c-1.2,0.1-2.1,0.2-3.1,0.2c-9.7,0-19.5,0-29.2,0 c-5.3,0-7.1,1.8-7.1,7c0,7.1,0,14.2,0,21.2c0,5,1.7,6.7,6.8,6.7c38.9,0,77.8,0,116.7,0c5.1,0,6.8-1.7,6.9-6.9c0-7.1,0-14.2,0-21.2 c0-4.9-1.9-6.8-6.8-6.8c-9.8,0-19.7,0-29.5,0C107.9,109.9,107,109.8,105.7,109.8z\"/><path d=\"M72.5,90.5c0-1,0-1.9,0-2.9c0-25.7,0-51.5,0-77.2c0-1.4,0.1-2.8,0.3-4.2C73.5,2.6,76.6,0,80,0c3.3,0,6.4,2.6,7,6 c0.3,1.4,0.3,2.8,0.3,4.2c0,25.9,0,51.8,0,77.7c0,0.9,0.1,1.8,0.2,3.3c1.3-1,2.1-1.6,2.8-2.3c8.2-8.2,16.4-16.4,24.6-24.5 c1.3-1.3,2.7-2.5,4.2-3.4c2.8-1.6,6.2-1,8.4,1.4c2.1,2.2,2.7,5.7,1.2,8.3c-0.7,1.3-1.7,2.5-2.7,3.6c-13.2,13.2-26.4,26.4-39.6,39.6 c-4.7,4.7-8.5,4.7-13.1,0.1c-13.4-13.4-26.8-26.7-40.1-40.1c-4.2-4.3-4.2-9.4,0-12.3c2.6-1.8,5.3-2,7.9-0.2 c1.4,0.9,2.6,2.1,3.8,3.2c8.2,8.1,16.3,16.2,24.4,24.4c0.7,0.7,1.5,1.4,2.3,2.1C72,90.8,72.2,90.7,72.5,90.5z\"/><path d=\"M120.3,127.2c0.1-4,3.2-7.2,7.1-7.2c4,0,7.3,3.3,7.3,7.3c0,3.8-3.7,7.4-7.3,7.3C123.5,134.6,120.2,131.2,120.3,127.2z\"/></g></svg>');opacity:0.25;width:60px;height:60px;display:inline-block}.drag-icon+p{margin:0;font-size:0.9rem}.media-preview{display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:center;margin-top:10px}// UPLOADER .direct-upload-wrapper{position:fixed;z-index:9999;top:0;left:0;width:100vw;height:100vh;display:flex;align-items:center;justify-content:center;background:rgba(#333, 0.9)}.direct-upload-content{display:block;background:#fcfcfc;padding:40px 60px 60px;border-radius:3px;width:60vw}.direct-upload-content h3{border-bottom:2px solid #1f1f1f;margin-bottom:20px}.separate-upload{padding:0 10px;margin-top:10px;font-size:0.9em}.direct-upload--pending{opacity:0.6}.direct-upload--complete{opacity:0.4}.direct-upload--error{border-color:red}input[type=file][data-direct-upload-url][disabled]{display:none}:host.separate-upload{padding:0 10px;margin-top:10px;font-size:0.9em}";

const BardFile$1 = /*@__PURE__*/ proxyCustomElement(class BardFile extends HTMLElement {
    get el() { return this; }
    originalId;
    fileTarget;
    hiddenTarget;
    formController;
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.name = undefined;
        this.directupload = undefined;
        this.multiple = false;
        this.required = false;
        this.accepts = undefined;
        this.max = undefined;
        this.files = undefined;
        this.originalId = this.el.id;
        this.files = Array.from(this.el.children).filter(e => e.tagName == "UPLOADED-FILE");
        Object.defineProperty(this.el, "value", {
            get() {
                return this.files.map(uploadedFile => uploadedFile.value);
            },
            set(val) {
                this.files = [];
                const signedIds = this.signedIdsFromValue(val);
                const promises = signedIds.map(signedId => {
                    return UploadedFile.fromSignedId(signedId, { name: this.name });
                });
                Promise.all(promises).then(uploadedFiles => {
                    this.assignFiles(uploadedFiles);
                });
            },
        });
    }
    signedIdsFromValue(value) {
        let signedIds = [];
        if (typeof value == "string" && value.length > 0) {
            signedIds = value.split(",");
        }
        if (Array.isArray(value)) {
            signedIds = value;
        }
        return signedIds.filter(signedId => {
            return signedId.toString().length > 0;
        });
    }
    connectedCallback() {
        this.el.removeAttribute("id");
        this.formController = FormController.forForm(this.el.closest("form"));
    }
    fileTargetChanged(_event) {
        const uploadedFiles = Array.from(this.fileTarget.files).map(file => {
            return UploadedFile.fromFile(file, {
                name: this.name,
                accepts: this.accepts,
                max: this.max,
                url: this.directupload,
            });
        });
        this.fileTarget.value = null;
        this.assignFiles(uploadedFiles);
    }
    assignFiles(uploadedFiles) {
        if (this.multiple) {
            this.files.push(...uploadedFiles);
        }
        else {
            this.files = uploadedFiles.slice(-1);
        }
        this.render();
        this.renderFiles();
        this.el.dispatchEvent(new Event("change"));
    }
    removeUploadedFile(event) {
        const index = this.files.findIndex(uf => uf.uid === event.detail.uid);
        if (index !== -1)
            this.files.splice(index, 1);
        this.render();
        this.renderFiles();
        this.el.dispatchEvent(new Event("change"));
    }
    componentWillLoad() {
        this.el.insertAdjacentHTML("afterbegin", `
      <input type="file"
        style="opacity: 0.01; width: 1px; height: 1px; z-index: -999"
        id="${this.originalId}"
      />
      <input type="hidden" name="${this.name}" />
    `);
        this.fileTarget = this.el.querySelector("input[type=file]");
        this.fileTarget.multiple = this.multiple;
        this.fileTarget.addEventListener("change", event => this.fileTargetChanged(event));
        this.hiddenTarget = this.el.querySelector("input[type=hidden]");
    }
    render() {
        this.fileTarget.required = this.files.length === 0 && this.required;
        this.hiddenTarget.disabled = this.files.length > 0;
        return (h(Host, null, h("file-drop", { for: this.originalId }, h("i", { class: "drag-icon" }), h("p", null, h("strong", null, "Choose ", this.multiple ? "files" : "file", " "), h("span", null, "or drag ", this.multiple ? "them" : "it", " here.")), h("div", { class: `media-preview ${this.multiple ? '-stacked' : ''}` }, h("slot", null)))));
    }
    renderFiles() {
        const existingUploadedFiles = Array.from(this.el.children).filter(e => e.tagName === "UPLOADED-FILE");
        this.files.forEach(uploadedFile => {
            if (!existingUploadedFiles.includes(uploadedFile)) {
                this.el.append(uploadedFile);
            }
        });
        existingUploadedFiles.forEach(dom => {
            if (!this.files.includes(dom)) {
                this.el.removeChild(dom);
            }
        });
    }
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
    static get style() { return bardFileCss; }
}, [1, "bard-file", {
        "name": [1],
        "directupload": [1],
        "multiple": [4],
        "required": [4],
        "accepts": [1],
        "max": [2],
        "files": [16]
    }, [[0, "uploaded-file:remove", "removeUploadedFile"]]]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["bard-file", "file-drop"];
    components.forEach(tagName => { switch (tagName) {
        case "bard-file":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, BardFile$1);
            }
            break;
        case "file-drop":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const BardFile = BardFile$1;
const defineCustomElement = defineCustomElement$1;

export { BardFile, defineCustomElement };

//# sourceMappingURL=bard-file.js.map