import morph from "morphdom";
function html(html) {
    const el = document.createElement("div");
    morph(el, `<div>${html}</div>`);
    return el.children[0];
}
function arrayRemove(arr, e) {
    const index = arr.findIndex(x => x === e);
    if (index !== -1) {
        arr.splice(index, 1);
    }
}
export { morph, html, arrayRemove };
//# sourceMappingURL=utils.js.map
