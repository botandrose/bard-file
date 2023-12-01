import FormController from "./form-controller";
export declare class BardFile {
    el: HTMLElement;
    name: string;
    directupload: string;
    multiple: boolean;
    required: boolean;
    accepts: string;
    max: number;
    files: Array<any>;
    originalId: string;
    fileTarget: HTMLInputElement;
    hiddenTarget: HTMLInputElement;
    formController: FormController;
    constructor();
    signedIdsFromValue(value: any): any[];
    connectedCallback(): void;
    fileTargetChanged(_event: any): void;
    assignFiles(uploadedFiles: any): void;
    removeUploadedFile(event: any): void;
    componentWillLoad(): void;
    render(): any;
    renderFiles(): void;
    checkValidity(): boolean;
    setCustomValidity(msg: any): void;
    reportValidity(): void;
    get validationMessage(): string;
}
