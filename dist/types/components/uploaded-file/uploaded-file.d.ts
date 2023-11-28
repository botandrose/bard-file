import { EventEmitter } from '../../stencil-public-runtime';
export declare class UploadedFile {
    static fromFile(file: any, props?: {}): HTMLUploadedFileElement & {
        src: string;
        filename: any;
        mimetype: string;
        size: any;
        state: string;
        percent: number;
        file: any;
    };
    static fromSignedId(signedId: any, props?: {}): any;
    el: any;
    name: string;
    value: string;
    filename: string;
    src: string;
    mimetype: string;
    size: number;
    accepts: string;
    max: number;
    state: string;
    percent: number;
    file: File;
    validationMessage: string;
    removeEvent: EventEmitter;
    private removeSelf;
    checkValidity: any;
    setCustomValidity: any;
    constructor();
    render(): any;
    componentDidLoad(): void;
}
