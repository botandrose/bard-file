import { AttachmentFile } from './attachment-file';
export default class Max {
    #private;
    uploadedFile: AttachmentFile;
    constructor(uploadedFile: any);
    get errors(): string[];
    checkValidity(): boolean;
    get errorMessage(): string;
    formatBytes(bytes: any, decimals?: number): string;
}
