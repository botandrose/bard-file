import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const progressBarCss = ":host{display:block;position:relative;padding:0 20px;margin:0 0px 10px 0;border:1px solid rgba(0, 0, 0, 0.3);border-radius:3px;font-size:18px;line-height:2;flex:0 0 calc(100% - 30px);text-align:left}.bar{position:absolute;top:0;left:0;bottom:0;opacity:0.2;background:#398927;transition:width 120ms ease-out, opacity 60ms 60ms ease-in;transform:translate3d(0, 0, 0)}";

const ProgressBar = /*@__PURE__*/ proxyCustomElement(class ProgressBar extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.percent = 0;
    }
    render() {
        return (h(Host, null, h("div", { class: "bar", style: { width: `${this.percent}%` } }), h("slot", null)));
    }
    static get style() { return progressBarCss; }
}, [1, "progress-bar", {
        "percent": [514]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["progress-bar"];
    components.forEach(tagName => { switch (tagName) {
        case "progress-bar":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, ProgressBar);
            }
            break;
    } });
}

export { ProgressBar as P, defineCustomElement as d };

//# sourceMappingURL=progress-bar2.js.map