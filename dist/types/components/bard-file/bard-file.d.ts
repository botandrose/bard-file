import FormController from "./form-controller";
import { UploadedFile } from "../uploaded-file/uploaded-file";
export declare class BardFile {
    el: HTMLElement;
    name: string;
    directupload: string;
    multiple: boolean;
    required: boolean;
    accepts: string;
    max: number;
    files: Array<UploadedFile>;
    originalId: string;
    fileTarget: HTMLInputElement;
    hiddenTarget: HTMLInputElement;
    formController: FormController;
    constructor();
    signedIdsFromValue(value: any): any[];
    connectedCallback(): void;
    init(event: any): void;
    start(event: any): void;
    progress(event: any): void;
    error(event: any): void;
    end(event: any): void;
    fileTargetChanged(_event: any): void;
    assignFiles(uploadedFiles: any): void;
    removeFile(file: any): void;
    componentWillLoad(): void;
    render(): any;
    renderFiles(): void;
    checkValidity(): boolean;
    setCustomValidity(msg: any): void;
    reportValidity(): void;
    get validationMessage(): string;
}
