'use strict';

var index = require('./index-qm9EEyqH.js');
var appGlobals = require('./app-globals-V2Kpy_OQ.js');

var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
/*
 Stencil Client Patch Browser v4.38.2 | MIT Licensed | https://stenciljs.com
 */

var patchBrowser = () => {
  const importMeta = (typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('bard-file.cjs.js', document.baseURI).href));
  const opts = {};
  if (importMeta !== "") {
    opts.resourcesUrl = new URL(".", importMeta).href;
  }
  return index.promiseResolve(opts);
};

patchBrowser().then(async (options) => {
  await appGlobals.globalScripts();
  return index.bootstrapLazy([["bard-file_3.cjs",[[257,"uploaded-file",{"name":[1537],"accepts":[1537],"max":[1538],"url":[1537],"value":[1537],"filename":[1537],"src":[1537],"filetype":[1537],"size":[1538],"state":[1537],"percent":[1538],"preview":[1540],"validationMessage":[1,"validation-message"]},[[0,"direct-upload:initialize","start"],[0,"direct-upload:start","start"],[0,"direct-upload:progress","progress"],[0,"direct-upload:error","error"],[0,"direct-upload:end","end"]],{"filename":["setMissingFiletype"]}],[257,"bard-file",{"name":[1],"directupload":[1],"multiple":[4],"required":[4],"accepts":[1],"max":[2],"preview":[4],"_forceUpdate":[32]},[[0,"change","fileTargetChanged"],[0,"uploaded-file:remove","removeUploadedFile"],[0,"direct-upload:end","fireChangeEvent"]]],[257,"file-preview",{"src":[513],"filetype":[513]}]]]], options);
});

exports.setNonce = index.setNonce;
//# sourceMappingURL=bard-file.cjs.js.map
