'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7b8f0eb1.js');
const appGlobals = require('./app-globals-3a1e7e63.js');

/*
 Stencil Client Patch Browser v4.8.0 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    // NOTE!! This fn cannot use async/await!
    if (index.BUILD.isDev && !index.BUILD.isTesting) {
        index.consoleDevInfo('Running in development mode.');
    }
    if (index.BUILD.cloneNodeFix) {
        // opted-in to polyfill cloneNode() for slot polyfilled components
        patchCloneNodeFix(index.H.prototype);
    }
    const scriptElm = index.BUILD.scriptDataOpts
        ? Array.from(index.doc.querySelectorAll('script')).find((s) => new RegExp(`\/${index.NAMESPACE}(\\.esm)?\\.js($|\\?|#)`).test(s.src) ||
            s.getAttribute('data-stencil-namespace') === index.NAMESPACE)
        : null;
    const importMeta = (typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('bard-file.cjs.js', document.baseURI).href));
    const opts = index.BUILD.scriptDataOpts ? (scriptElm || {})['data-opts'] || {} : {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return index.promiseResolve(opts);
};
const patchCloneNodeFix = (HTMLElementPrototype) => {
    const nativeCloneNodeFn = HTMLElementPrototype.cloneNode;
    HTMLElementPrototype.cloneNode = function (deep) {
        if (this.nodeName === 'TEMPLATE') {
            return nativeCloneNodeFn.call(this, deep);
        }
        const clonedNode = nativeCloneNodeFn.call(this, false);
        const srcChildNodes = this.childNodes;
        if (deep) {
            for (let i = 0; i < srcChildNodes.length; i++) {
                // Node.ATTRIBUTE_NODE === 2, and checking because IE11
                if (srcChildNodes[i].nodeType !== 2) {
                    clonedNode.appendChild(srcChildNodes[i].cloneNode(true));
                }
            }
        }
        return clonedNode;
    };
};

patchBrowser().then(options => {
  appGlobals.globalScripts();
  return index.bootstrapLazy([["file-preview.cjs",[[1,"file-preview",{"src":[513],"filetype":[513]}]]],["progress-bar.cjs",[[1,"progress-bar",{"percent":[514]}]]],["uploaded-file.cjs",[[1,"uploaded-file",{"name":[1537],"accepts":[1537],"max":[1538],"url":[1537],"value":[1537],"filename":[1537],"src":[1537],"filetype":[1537],"size":[1538],"state":[1537],"percent":[1538],"preview":[1540],"validationMessage":[1,"validation-message"]},[[0,"direct-upload:initialize","start"],[0,"direct-upload:start","start"],[0,"direct-upload:progress","progress"],[0,"direct-upload:error","error"],[0,"direct-upload:end","end"]],{"filename":["setMissingFiletype"]}]]],["bard-file.cjs",[[1,"bard-file",{"name":[1],"directupload":[1],"multiple":[4],"required":[4],"accepts":[1],"max":[2],"preview":[4],"_forceUpdate":[32]},[[0,"change","fileTargetChanged"],[0,"uploaded-file:remove","removeUploadedFile"],[0,"direct-upload:end","fireChangeEvent"]]]]]], options);
});

exports.setNonce = index.setNonce;

//# sourceMappingURL=bard-file.cjs.js.map