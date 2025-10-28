import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const progressBarCss = ":host{display:block;position:relative;padding:0 20px;border:1px solid rgba(0, 0, 0, 0.3);border-radius:3px;line-height:2;flex:1 0;box-sizing:border-box;text-align:left;font-size:13px}.bar{position:absolute;top:0;left:0;bottom:0;background:rgba(57, 137, 39, 1);transition:width 120ms ease-out, opacity 60ms 60ms ease-in;transform:translate3d(0, 0, 0)}.content{position:relative;color:#fff;font-size:1em}";

const ProgressBar = /*@__PURE__*/ proxyCustomElement(class ProgressBar extends HTMLElement {
    constructor(registerHost) {
        super();
        if (registerHost !== false) {
            this.__registerHost();
        }
        this.__attachShadow();
    }
    percent = 0;
    render() {
        return (h(Host, { key: 'a1ad6c503184a576d81a7ef3367a4eaf2cc8a4a5' }, h("div", { key: '1c0d538633c368682c745d00fcc5dce23c955cfa', class: "bar", style: { width: `${this.percent}%` } }), h("span", { key: '256005595434e0d3a46c929f15deff2e347d7c92', class: "content" }, h("slot", { key: '9b2857fcdcd7c30575df5bcd0dd5c6191e1b6d0a' }))));
    }
    static get style() { return progressBarCss; }
}, [257, "progress-bar", {
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

//# sourceMappingURL=progress-bar2.js.map