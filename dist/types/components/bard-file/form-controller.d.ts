import { DirectUploadController } from "@rails/activestorage";
import { BardFile } from "./bard-file";
import { UploadedFile } from "../uploaded-file/uploaded-file";
declare class MyDirectUploadController extends DirectUploadController {
    bardFileInput: BardFile;
    bardFile: UploadedFile;
    constructor(input: any, bardFile: any);
    start(callback: any): void;
}
export default class FormController {
    static forForm(form: any): any;
    progressContainerTarget: HTMLElement;
    dialog: HTMLDialogElement;
    element: HTMLFormElement;
    progressTargetMap: {};
    controllers: Array<MyDirectUploadController>;
    submitted: boolean;
    processing: boolean;
    errors: boolean;
    constructor(form: any);
    beforeUnload(event: any): string;
    uploadFiles(bardFileInput: BardFile): void;
    submit(event: any): void;
    startNextController(): void;
    submitForm(): void;
    init(event: any): void;
    start(event: any): void;
    progress(event: any): void;
    error(event: any): void;
    end(event: any): void;
}
export {};
