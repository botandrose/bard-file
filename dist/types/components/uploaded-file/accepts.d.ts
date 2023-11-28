import { UploadedFile } from './uploaded-file';
export default class Accepts {
    #private;
    uploadedFile: UploadedFile;
    constructor(uploadedFile: any);
    get errors(): string[];
    private get regexMap();
    private joinWords;
}
