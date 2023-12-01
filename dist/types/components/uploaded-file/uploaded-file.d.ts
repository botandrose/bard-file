import { EventEmitter } from '../../stencil-public-runtime';
import DirectUploadController from './direct-upload-controller';
export declare class UploadedFile {
    static fromFile(file: any, props?: {}): UploadedFile;
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
    inputField: HTMLInputElement;
    controller: DirectUploadController;
    url: string;
    constructor();
    start(_event: any): void;
    progress(event: any): void;
    error(event: any): void;
    end(_event: any): void;
    render(): any;
    componentWillLoad(): void;
    componentDidRender(): void;
    componentDidLoad(): void;
}
