'use strict';

var index = require('./index-qm9EEyqH.js');
var appGlobals = require('./app-globals-V2Kpy_OQ.js');

const defineCustomElements = async (win, options) => {
  if (typeof window === 'undefined') return undefined;
  await appGlobals.globalScripts();
  return index.bootstrapLazy([["bard-file_3.cjs",[[257,"uploaded-file",{"name":[1537],"accepts":[1537],"max":[1538],"url":[1537],"value":[1537],"filename":[1537],"src":[1537],"filetype":[1537],"size":[1538],"state":[1537],"percent":[1538],"preview":[1540],"validationMessage":[1,"validation-message"]},[[0,"direct-upload:initialize","start"],[0,"direct-upload:start","start"],[0,"direct-upload:progress","progress"],[0,"direct-upload:error","error"],[0,"direct-upload:end","end"]],{"filename":["setMissingFiletype"]}],[257,"bard-file",{"name":[1],"directupload":[1],"multiple":[4],"required":[4],"accepts":[1],"max":[2],"preview":[4],"_forceUpdate":[32]},[[0,"change","fileTargetChanged"],[0,"uploaded-file:remove","removeUploadedFile"],[0,"direct-upload:end","fireChangeEvent"]]],[257,"file-preview",{"src":[513],"filetype":[513]}]]]], options);
};

exports.setNonce = index.setNonce;
exports.defineCustomElements = defineCustomElements;
//# sourceMappingURL=loader.cjs.js.map
