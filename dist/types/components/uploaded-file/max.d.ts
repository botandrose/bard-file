import { UploadedFile } from './uploaded-file';
export default class Max {
    #private;
    uploadedFile: UploadedFile;
    constructor(uploadedFile: any);
    get errors(): string[];
    checkValidity(): boolean;
    get errorMessage(): string;
    formatBytes(bytes: any, decimals?: number): string;
}
