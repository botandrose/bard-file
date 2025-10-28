import { b as bootstrapLazy } from './index-12206424.js';
export { s as setNonce } from './index-12206424.js';
import { g as globalScripts } from './app-globals-0f993ce5.js';

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return undefined;
  globalScripts();
  return bootstrapLazy([["file-preview",[[1,"file-preview",{"src":[513],"filetype":[513]}]]],["progress-bar",[[1,"progress-bar",{"percent":[514]}]]],["uploaded-file",[[1,"uploaded-file",{"name":[1537],"accepts":[1537],"max":[1538],"url":[1537],"value":[1537],"filename":[1537],"src":[1537],"filetype":[1537],"size":[1538],"state":[1537],"percent":[1538],"preview":[1540],"validationMessage":[1,"validation-message"]},[[0,"direct-upload:initialize","start"],[0,"direct-upload:start","start"],[0,"direct-upload:progress","progress"],[0,"direct-upload:error","error"],[0,"direct-upload:end","end"]],{"filename":["setMissingFiletype"]}]]],["bard-file",[[1,"bard-file",{"name":[1],"directupload":[1],"multiple":[4],"required":[4],"accepts":[1],"max":[2],"preview":[4],"_forceUpdate":[32]},[[0,"change","fileTargetChanged"],[0,"uploaded-file:remove","removeUploadedFile"],[0,"direct-upload:end","fireChangeEvent"]]]]]], options);
};

export { defineCustomElements };

//# sourceMappingURL=loader.js.map