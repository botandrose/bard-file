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
    _forceUpdate: boolean;
    forceUpdate(): void;
    originalId: string;
    fileTarget: HTMLInputElement;
    hiddenTarget: HTMLInputElement;
    formController: FormController;
    constructor();
    componentWillLoad(): void;
    get value(): any[];
    set value(val: any[]);
    _signedIdsFromValue(value: any): any[];
    fileTargetChanged(_event: any): void;
    assignFiles(uploadedFiles: any): void;
    removeUploadedFile(event: any): void;
    render(): any;
    componentDidRender(): void;
    checkValidity(): boolean;
    setCustomValidity(msg: any): void;
    reportValidity(): void;
    get validationMessage(): string;
}
