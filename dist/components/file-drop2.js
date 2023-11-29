import { proxyCustomElement, HTMLElement } from '@stencil/core/internal/client';

const fileDropCss = "file-drop{display:block !important}";

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
        event.stopPropagation();
        this.el.classList.add("-dragover");
    }
    unhighlight(event) {
        event.preventDefault();
        event.stopPropagation();
        this.el.classList.remove("-dragover");
    }
    drop(event) {
        event.preventDefault();
        event.stopPropagation();
        this.unhighlight(event);
        this.fileTarget.files = event.dataTransfer.files;
        this.fileTarget.dispatchEvent(new Event("change"));
    }
    static get style() { return fileDropCss; }
}, [0, "file-drop", {
        "for": [1]
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