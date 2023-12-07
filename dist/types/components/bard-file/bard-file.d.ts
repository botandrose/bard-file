export declare class BardFile {
    el: HTMLElement;
    name: string;
    directupload: string;
    multiple: boolean;
    required: boolean;
    accepts: string;
    max: number;
    _forceUpdate: boolean;
    forceUpdate(): void;
    fileTarget: HTMLInputElement;
    hiddenTarget: HTMLInputElement;
    _files: Array<any>;
    constructor();
    componentWillLoad(): void;
    get files(): any[];
    set files(val: any[]);
    get value(): any[];
    set value(val: any[]);
    fileTargetChanged(event: any): void;
    removeUploadedFile(event: any): void;
    render(): any;
    componentDidRender(): void;
    checkValidity(): boolean;
    setCustomValidity(msg: any): void;
    reportValidity(): void;
    get validationMessage(): string;
}
