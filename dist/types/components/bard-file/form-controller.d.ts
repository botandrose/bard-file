import DirectUploadController from "../uploaded-file/direct-upload-controller";
export default class FormController {
    static forForm(form: any): any;
    progressContainerTarget: HTMLElement;
    dialog: HTMLDialogElement;
    element: HTMLFormElement;
    progressTargetMap: {};
    controllers: Array<DirectUploadController>;
    submitted: boolean;
    processing: boolean;
    errors: boolean;
    constructor(form: any);
    beforeUnload(event: any): string;
    submit(event: any): void;
    startNextController(): void;
    submitForm(): void;
    init(event: any): void;
    start(event: any): void;
    progress(event: any): void;
    error(event: any): void;
    end(event: any): void;
    removeUploadedFile(event: any): void;
}
