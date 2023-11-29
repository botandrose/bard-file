import { EventEmitter } from '../../stencil-public-runtime';
import DirectUploadController from './direct-upload-controller';
export declare class UploadedFile {
    static fromFile(file: any, props?: any): UploadedFile;
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
    private removeClicked;
    hiddenField: HTMLInputElement;
    controller: DirectUploadController;
    checkValidity: any;
    setCustomValidity: any;
    constructor();
    render(): any;
    componentWillLoad(): void;
    componentDidRender(): void;
}
