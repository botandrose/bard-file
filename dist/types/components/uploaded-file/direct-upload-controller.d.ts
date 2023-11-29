import { UploadedFile } from "./uploaded-file";
export default class DirectUploadController {
    uploadedFile: UploadedFile;
    input: HTMLInputElement;
    file: File;
    directUpload: any;
    constructor(input: any, uploadedFile: any, url: any);
    start(callback: any): void;
    uploadRequestDidProgress(event: any): void;
    dispatch(name: any, detail?: any): any;
    dispatchError(error: any): void;
    directUploadWillCreateBlobWithXHR(xhr: any): void;
    directUploadWillStoreFileWithXHR(xhr: any): void;
}
