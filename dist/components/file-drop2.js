import { proxyCustomElement, HTMLElement } from '@stencil/core/internal/client';

const fileDropCss = "file-drop{display:flex;flex-direction:column;justify-content:center;align-items:center;box-sizing:border-box;min-height:60px;outline-offset:-10px;padding:20px;background:rgba(255, 255, 255, 0.25);text-align:center;transition:all 0.15s ease 0s;outline:rgba(0, 0, 0, 0.25) dashed 2px;font-size:13px}";

const FileDrop = /*@__PURE__*/ proxyCustomElement(class FileDrop extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.for = undefined;
    }
    get el() { return this; }
    get fileTarget() {
        return document.querySelector(`#${this.for}`);
    }
    openFilePicker(_event) {
        this.fileTarget.click();
    }
    highlight(event) {
        event.preventDefault();
        this.el.classList.add("-dragover");
    }
    unhighlight(_event) {
        this.el.classList.remove("-dragover");
    }
    drop(event) {
        event.preventDefault();
        this.el.classList.remove("-dragover");
        this.fileTarget.files = event.dataTransfer.files;
        const changeEvent = new Event("change", { bubbles: true });
        this.fileTarget.dispatchEvent(changeEvent);
    }
    static get style() { return fileDropCss; }
}, [0, "file-drop", {
        "for": [1537]
    }, [[0, "click", "openFilePicker"], [0, "dragover", "highlight"], [0, "dragleave", "unhighlight"], [0, "drop", "drop"]]]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["file-drop"];
    components.forEach(tagName => { switch (tagName) {
        case "file-drop":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, FileDrop);
            }
            break;
    } });
}

export { FileDrop as F, defineCustomElement as d };

//# sourceMappingURL=file-drop2.js.map