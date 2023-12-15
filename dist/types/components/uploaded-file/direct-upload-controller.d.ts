import { UploadedFile } from "./uploaded-file";
export default class DirectUploadController {
    uploadedFile: UploadedFile;
    file: File;
    directUpload: any;
    recordXHR: XMLHttpRequest;
    uploadXHR: XMLHttpRequest;
    callback: any;
    constructor(uploadedFile: any);
    cancel(): void;
    abortXHR(xhr: any): void;
    start(callback: any): void;
    complete(error: any, _attributes: any): void;
    uploadRequestDidProgress(event: any): void;
    dispatch(name: any, detail?: {}): any;
    dispatchError(error: any): void;
    directUploadWillCreateBlobWithXHR(xhr: any): void;
    directUploadWillStoreFileWithXHR(xhr: any): void;
}
