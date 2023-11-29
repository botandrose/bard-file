import { UploadedFile } from "./uploaded-file";
export default class DirectUploadController {
    uploadedFile: UploadedFile;
    file: File;
    directUpload: any;
    constructor(uploadedFile: any);
    start(callback: any): void;
    uploadRequestDidProgress(event: any): void;
    dispatch(name: any, detail?: any): any;
    dispatchError(error: any): void;
    directUploadWillCreateBlobWithXHR(xhr: any): void;
    directUploadWillStoreFileWithXHR(xhr: any): void;
}
