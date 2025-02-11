import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { h as html, U as UploadedFile, a as arrayRemove, m as morphdom } from './uploaded-file2.js';
import { d as defineCustomElement$2 } from './file-drop2.js';

class FormController {
    static instance(form) {
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
        if (this.element.dataset.remote !== "true" && !window.Turbo?.session?.enabled) {
            this.element.addEventListener("submit", event => this.submit(event));
        }
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
            window.setTimeout(() => {
                this.element.submit();
            }, 10);
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

const bardFileCss = ":host{display:block;padding:25px;color:var(--bard-file-text-color, #000);font-size:13px}:host *{box-sizing:border-box;position:relative}drag-and-drop{display:block;outline-offset:-10px;background:rgba(255,255,255, 0.25);margin:0;text-align:center;transition:all 0.15s;outline:2px dashed rgba(0,0,0,0.25);color:#444;font-size:14px}p{padding:10px 20px;margin:0}drag-and-drop.-full{width:100%}.-dragover{background:rgba(255,255,255,0.5);outline:2px dashed rgba(0,0,0,0.25)}.media-preview{display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:center}// UPLOADER .direct-upload-wrapper{position:fixed;z-index:9999;top:0;left:0;width:100vw;height:100vh;display:flex;align-items:center;justify-content:center;background:rgba(#333, 0.9)}.direct-upload-content{display:block;background:#fcfcfc;padding:40px 60px 60px;border-radius:3px;width:60vw}.direct-upload-content h3{border-bottom:2px solid #1f1f1f;margin-bottom:20px}.separate-upload{padding:0 10px;margin-top:10px;font-size:0.9em}.direct-upload--pending{opacity:0.6}.direct-upload--complete{opacity:0.4}.direct-upload--error{border-color:red}input[type=file][data-direct-upload-url][disabled]{display:none}:host.separate-upload{padding:0 10px;margin-top:10px;font-size:0.9em}";

const BardFile$1 = /*@__PURE__*/ proxyCustomElement(class BardFile extends HTMLElement {
    get el() { return this; }
    forceUpdate() { this._forceUpdate = !this._forceUpdate; }
    form;
    fileTargetId;
    fileTarget;
    hiddenTargetId;
    hiddenTarget;
    _files = [];
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
        this.preview = true;
        this._forceUpdate = false;
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
        return (h(Host, null, h("file-drop", { for: this.fileTargetId }, h("p", { part: "title" }, h("strong", null, "Choose ", this.multiple ? "files" : "file", " "), h("span", null, "or drag ", this.multiple ? "them" : "it", " here.")), h("div", { class: `media-preview ${this.multiple ? '-stacked' : ''}` }, h("slot", null)))));
    }
    componentDidRender() {
        morphdom(this.fileTarget, `
      <input id="${this.fileTargetId}"
        type="file"
        ${this.multiple ? "multiple" : ""}
        ${this.required && this.files.length === 0 ? "required" : ""}
        style="opacity: 0.01; width: 1px; height: 1px; z-index: -999"
      >`);
        morphdom(this.hiddenTarget, `
      <input id="${this.hiddenTargetId}"
        type="hidden"
        name="${this.name}"
        ${this.files.length > 0 ? "disabled" : ""}
      >`);
        const wrapper = document.createElement("div");
        wrapper.replaceChildren(this.fileTarget, this.hiddenTarget, ...this.files);
        morphdom(this.el, wrapper, { childrenOnly: true });
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
    static get style() { return bardFileCss; }
}, [1, "bard-file", {
        "name": [1],
        "directupload": [1],
        "multiple": [4],
        "required": [4],
        "accepts": [1],
        "max": [2],
        "preview": [4],
        "_forceUpdate": [32]
    }, [[0, "change", "fileTargetChanged"], [0, "uploaded-file:remove", "removeUploadedFile"], [0, "direct-upload:end", "fireChangeEvent"]]]);
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