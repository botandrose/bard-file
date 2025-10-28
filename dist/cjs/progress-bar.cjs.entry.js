'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7b8f0eb1.js');

const progressBarCss = ":host{display:block;position:relative;padding:0 20px;border:1px solid rgba(0, 0, 0, 0.3);border-radius:3px;line-height:2;flex:1 0;box-sizing:border-box;text-align:left;font-size:13px}.bar{position:absolute;top:0;left:0;bottom:0;background:rgba(57, 137, 39, 1);transition:width 120ms ease-out, opacity 60ms 60ms ease-in;transform:translate3d(0, 0, 0)}.content{position:relative;color:#fff;font-size:1em}";

const ProgressBar = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.percent = 0;
    }
    render() {
        return (index.h(index.Host, null, index.h("div", { class: "bar", style: { width: `${this.percent}%` } }), index.h("span", { class: "content" }, index.h("slot", null))));
    }
};
ProgressBar.style = progressBarCss;

exports.progress_bar = ProgressBar;

//# sourceMappingURL=progress-bar.cjs.entry.js.map