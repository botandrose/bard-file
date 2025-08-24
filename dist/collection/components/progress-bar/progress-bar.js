import { Host, h } from "@stencil/core";
export class ProgressBar {
    constructor() {
        this.percent = 0;
    }
    render() {
        return (h(Host, null, h("div", { class: "bar", style: { width: `${this.percent}%` } }), h("span", { class: "content" }, h("slot", null))));
    }
    static get is() { return "progress-bar"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["progress-bar.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["progress-bar.css"]
        };
    }
    static get properties() {
        return {
            "percent": {
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
                "attribute": "percent",
                "reflect": true,
                "defaultValue": "0"
            }
        };
    }
}
//# sourceMappingURL=progress-bar.js.map
