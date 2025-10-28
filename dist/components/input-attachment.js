import { proxyCustomElement, HTMLElement as HTMLElement$1, h, Host } from '@stencil/core/internal/client';
import { A as AttachmentFile } from './attachment-file2.js';

class FormController {
    static instance(form) {
        return form.inputAttachmentFormController ||= new FormController(form);
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
        if (this.element.dataset.remote !== "true" && (this.element.dataset.turbo == "false" || !window.Turbo?.session?.enabled)) {
            this.element.addEventListener("submit", event => this.submit(event));
        }
        window.addEventListener("beforeunload", event => this.beforeUnload(event));
        this.element.addEventListener("direct-upload:initialize", event => this.init(event));
        this.element.addEventListener("direct-upload:start", event => this.start(event));
        this.element.addEventListener("direct-upload:progress", event => this.progress(event));
        this.element.addEventListener("direct-upload:error", event => this.error(event));
        this.element.addEventListener("direct-upload:end", event => this.end(event));
        this.element.addEventListener("attachment-file:remove", event => this.removeUploadedFile(event));
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
            this.setInputAttachmentsDisabled(true);
            controller.start(error => {
                if (error) {
                    this.setInputAttachmentsDisabled(false);
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
            this.setInputAttachmentsDisabled(true);
            window.setTimeout(() => {
                this.element.submit();
            }, 10);
        }
    }
    setInputAttachmentsDisabled(disabled) {
        Array.from(this.element.querySelectorAll("input-attachment"))
            .forEach((el) => {
            el.disabled = disabled;
        });
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

function html(html) {
    const el = document.createElement("div");
    el.innerHTML = html;
    return el.children[0];
}
function arrayRemove(arr, e) {
    const index = arr.findIndex(x => x === e);
    if (index !== -1) {
        arr.splice(index, 1);
    }
}

/**
 * File Drop Component
 *
 * A vanilla JS custom element for drag-and-drop file handling.
 * Provides drag-and-drop interface that assigns files to a target input element.
 *
 * Usage:
 *   <file-drop for="file-input">Drop files here</file-drop>
 *   <input type="file" id="file-input" multiple>
 *
 * Features:
 * - Drag and drop file handling
 * - Click to open file picker
 * - Visual feedback during drag operations
 * - Framework-agnostic vanilla JS
 */

class FileDrop extends HTMLElement {
  constructor() {
    super();
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  static get observedAttributes() {
    return ['for']
  }

  connectedCallback() {
    this.addEventListener('dragover', this.handleDragOver);
    this.addEventListener('dragleave', this.handleDragLeave);
    this.addEventListener('drop', this.handleDrop);
    this.applyDefaultStyles();
  }

  disconnectedCallback() {
    this.removeEventListener('dragover', this.handleDragOver);
    this.removeEventListener('dragleave', this.handleDragLeave);
    this.removeEventListener('drop', this.handleDrop);
  }

  get fileTarget() {
    const forValue = this.getAttribute('for');
    if (!forValue) return null
    return document.querySelector(`#${forValue}`)
  }


  handleDragOver(event) {
    event.preventDefault();
    this.classList.add('-dragover');
  }

  handleDragLeave() {
    this.classList.remove('-dragover');
  }

  handleDrop(event) {
    event.preventDefault();
    this.classList.remove('-dragover');

    const target = this.fileTarget;
    if (target && event.dataTransfer.files.length > 0) {
      target.files = event.dataTransfer.files;
      const changeEvent = new Event('change', { bubbles: true });
      target.dispatchEvent(changeEvent);
    }
  }

  applyDefaultStyles() {
    if (!this.hasAttribute('data-no-default-styles')) {
      const styles = `
        file-drop {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
          min-height: 60px;
          outline-offset: -10px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.25);
          text-align: center;
          transition: all 0.15s ease 0s;
          outline: rgba(0, 0, 0, 0.25) dashed 2px;
          font-size: 13px;
        }

        file-drop.-dragover {
          background: rgba(0, 0, 0, 0.1);
          outline-color: rgba(0, 0, 0, 0.5);
        }
      `;

      if (!document.querySelector('#file-drop-default-styles')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'file-drop-default-styles';
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);
      }
    }
  }
}

// Auto-register the custom element
if (!customElements.get('file-drop')) {
  customElements.define('file-drop', FileDrop);
}

const inputAttachmentCss = ":host{display:block;padding:25px;color:var(--input-attachment-text-color, #000);font-size:13px}file-drop{cursor:pointer}:host *{box-sizing:border-box;position:relative}drag-and-drop{display:block;outline-offset:-10px;background:rgba(255,255,255, 0.25);margin:0;text-align:center;transition:all 0.15s;outline:2px dashed rgba(0,0,0,0.25);color:#444;font-size:14px}p{padding:10px 20px;margin:0}drag-and-drop.-full{width:100%}.-dragover{background:rgba(255,255,255,0.5);outline:2px dashed rgba(0,0,0,0.25)}.media-preview{display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:center}// UPLOADER .direct-upload-wrapper{position:fixed;z-index:9999;top:0;left:0;width:100vw;height:100vh;display:flex;align-items:center;justify-content:center;background:rgba(#333, 0.9)}.direct-upload-content{display:block;background:#fcfcfc;padding:40px 60px 60px;border-radius:3px;width:60vw}.direct-upload-content h3{border-bottom:2px solid #1f1f1f;margin-bottom:20px}.separate-upload{padding:0 10px;margin-top:10px;font-size:0.9em}.direct-upload--pending{opacity:0.6}.direct-upload--complete{opacity:0.4}.direct-upload--error{border-color:red}input[type=file][data-direct-upload-url][disabled]{display:none}:host.separate-upload{padding:0 10px;margin-top:10px;font-size:0.9em}";

const InputAttachment$1 = /*@__PURE__*/ proxyCustomElement(class InputAttachment extends HTMLElement$1 {
    get el() { return this; }
    name;
    directupload;
    multiple = false;
    required = false;
    accepts;
    max;
    preview = true;
    disabled = false;
    _forceUpdate = false;
    forceUpdate() { this._forceUpdate = !this._forceUpdate; }
    form;
    internals;
    fileInput;
    _files = [];
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.__attachShadow();
        this.internals = this.el.attachInternals();
    }
    componentWillLoad() {
        this.form = this.internals.form;
        if (this.form) {
            this.form.addEventListener("reset", () => this.reset());
            FormController.instance(this.form);
        }
        const existingFiles = Array.from(this.el.children).filter(e => e.tagName == "ATTACHMENT-FILE");
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
            this.files = newValue.map(signedId => Object.assign(new AttachmentFile(), {
                name: this.name,
                preview: this.preview,
                signedId,
            }));
        }
    }
    updateFormValue() {
        if (!this.name || !this.internals?.setFormValue)
            return;
        const formData = new FormData();
        formData.set(this.name, JSON.stringify(this.value));
        this.internals.setFormValue(formData);
    }
    reset() {
        this.value = [];
    }
    fileTargetChanged(event) {
        if (event.target !== this.fileInput)
            return;
        this.files.push(...Array.from(this.fileInput.files).map(file => Object.assign(new AttachmentFile(), {
            name: this.name,
            preview: this.preview,
            url: this.directupload,
            accepts: this.accepts,
            max: this.max,
            file,
        })));
        this.files = this.files;
        this.fileInput.value = null;
    }
    removeUploadedFile(event) {
        arrayRemove(this.files, event.detail);
        this.files = this.files;
    }
    fireChangeEvent() {
        requestAnimationFrame(() => {
            this.updateFormValue();
            this.el.dispatchEvent(new Event("change", { bubbles: true }));
        });
    }
    // Rendering
    render() {
        return (h(Host, { key: '777f0c9a82a195dfcb534747248a804e9d333218' }, h("input", { key: '5b9c555445b0a899a894e1b6006c9ea77e673c73', ref: el => this.fileInput = el, type: "file", multiple: this.multiple, accept: this.accepts, required: this.required && this.files.length === 0, disabled: this.disabled, style: {
                opacity: '0.01',
                width: '1px',
                height: '1px',
                zIndex: '-999'
            } }), h("file-drop", { key: 'b878ed760f8d694cca53b4d46fba2f546ed1f491', onClick: () => this.fileInput?.click() }, h("p", { key: 'd6d8e74e5cdaa5babf723b49c5193256e033fa88', part: "title" }, h("strong", { key: '2ebaf3c1d13b539e9d6a621740c7f6a0fc8009c7' }, "Choose ", this.multiple ? "files" : "file", " "), h("span", { key: '8e4cd499797f9b75d94faf3621fe8b3a686b14b2' }, "or drag ", this.multiple ? "them" : "it", " here.")), h("div", { key: '1a71ffbf66bc58133053059eafe9a1bf23309230', class: `media-preview ${this.multiple ? '-stacked' : ''}` }, h("slot", { key: '7b18d4f3a579d6579b0f68d3850b3346036aef2f' })))));
    }
    componentDidRender() {
        const wrapper = document.createElement("div");
        while (wrapper.firstChild) {
            wrapper.removeChild(wrapper.firstChild);
        }
        this.files.forEach(file => wrapper.appendChild(file));
        let needsUpdate = false;
        if (wrapper.children.length !== this.el.children.length) {
            needsUpdate = true;
        }
        else {
            for (let i = 0; i < wrapper.children.length; i++) {
                if (wrapper.children[i] !== this.el.children[i]) {
                    needsUpdate = true;
                    break;
                }
            }
        }
        if (needsUpdate) {
            while (this.el.firstChild) {
                this.el.removeChild(this.el.firstChild);
            }
            this.el.appendChild(wrapper);
        }
        this.updateFormValue();
    }
    // Validations
    checkValidity() {
        if (this.required && this.files.length === 0) {
            return false;
        }
        return true;
    }
    setCustomValidity(msg) {
        this.internals.setValidity(msg ? { customError: true } : {}, msg, this.fileInput);
    }
    reportValidity() {
        return this.internals.reportValidity();
    }
    get validationMessage() {
        return this.internals.validationMessage;
    }
    static get style() { return inputAttachmentCss; }
}, [257, "input-attachment", {
        "name": [1],
        "directupload": [1],
        "multiple": [4],
        "required": [4],
        "accepts": [1],
        "max": [2],
        "preview": [4],
        "disabled": [4],
        "_forceUpdate": [32]
    }, [[0, "change", "fileTargetChanged"], [0, "attachment-file:remove", "removeUploadedFile"], [0, "direct-upload:end", "fireChangeEvent"]]]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["input-attachment"];
    components.forEach(tagName => { switch (tagName) {
        case "input-attachment":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, InputAttachment$1);
            }
            break;
    } });
}

const InputAttachment = InputAttachment$1;
const defineCustomElement = defineCustomElement$1;

export { InputAttachment, defineCustomElement };
//# sourceMappingURL=input-attachment.js.map

//# sourceMappingURL=input-attachment.js.map