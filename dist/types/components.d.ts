/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "./stencil-public-runtime";
export namespace Components {
    interface BardFile {
        "accepts": string;
        "directupload": string;
        "files": Array<any>;
        "max": number;
        "multiple": boolean;
        "name": string;
        "required": boolean;
    }
    interface FileDrop {
        /**
          * The id of the an input[type=file] to assign dropped files to
         */
        "for": string;
    }
    interface FilePreview {
        "mimetype": string;
        "src": string;
    }
    interface ProgressBar {
        "percent": number;
    }
    interface UploadedFile {
        "accepts": string;
        "file": File;
        "filename": string;
        "max": number;
        "mimetype": string;
        "name": string;
        "percent": number;
        "size": number;
        "src": string;
        "state": string;
        "uid": number;
        "validationMessage": string;
        "value": string;
    }
}
export interface UploadedFileCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLUploadedFileElement;
}
declare global {
    interface HTMLBardFileElement extends Components.BardFile, HTMLStencilElement {
    }
    var HTMLBardFileElement: {
        prototype: HTMLBardFileElement;
        new (): HTMLBardFileElement;
    };
    interface HTMLFileDropElement extends Components.FileDrop, HTMLStencilElement {
    }
    var HTMLFileDropElement: {
        prototype: HTMLFileDropElement;
        new (): HTMLFileDropElement;
    };
    interface HTMLFilePreviewElement extends Components.FilePreview, HTMLStencilElement {
    }
    var HTMLFilePreviewElement: {
        prototype: HTMLFilePreviewElement;
        new (): HTMLFilePreviewElement;
    };
    interface HTMLProgressBarElement extends Components.ProgressBar, HTMLStencilElement {
    }
    var HTMLProgressBarElement: {
        prototype: HTMLProgressBarElement;
        new (): HTMLProgressBarElement;
    };
    interface HTMLUploadedFileElementEventMap {
        "uploaded-file:remove": any;
    }
    interface HTMLUploadedFileElement extends Components.UploadedFile, HTMLStencilElement {
        addEventListener<K extends keyof HTMLUploadedFileElementEventMap>(type: K, listener: (this: HTMLUploadedFileElement, ev: UploadedFileCustomEvent<HTMLUploadedFileElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLUploadedFileElementEventMap>(type: K, listener: (this: HTMLUploadedFileElement, ev: UploadedFileCustomEvent<HTMLUploadedFileElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLUploadedFileElement: {
        prototype: HTMLUploadedFileElement;
        new (): HTMLUploadedFileElement;
    };
    interface HTMLElementTagNameMap {
        "bard-file": HTMLBardFileElement;
        "file-drop": HTMLFileDropElement;
        "file-preview": HTMLFilePreviewElement;
        "progress-bar": HTMLProgressBarElement;
        "uploaded-file": HTMLUploadedFileElement;
    }
}
declare namespace LocalJSX {
    interface BardFile {
        "accepts"?: string;
        "directupload"?: string;
        "files"?: Array<any>;
        "max"?: number;
        "multiple"?: boolean;
        "name"?: string;
        "required"?: boolean;
    }
    interface FileDrop {
        /**
          * The id of the an input[type=file] to assign dropped files to
         */
        "for"?: string;
    }
    interface FilePreview {
        "mimetype"?: string;
        "src"?: string;
    }
    interface ProgressBar {
        "percent"?: number;
    }
    interface UploadedFile {
        "accepts"?: string;
        "file"?: File;
        "filename"?: string;
        "max"?: number;
        "mimetype"?: string;
        "name"?: string;
        "onUploaded-file:remove"?: (event: UploadedFileCustomEvent<any>) => void;
        "percent"?: number;
        "size"?: number;
        "src"?: string;
        "state"?: string;
        "uid"?: number;
        "validationMessage"?: string;
        "value"?: string;
    }
    interface IntrinsicElements {
        "bard-file": BardFile;
        "file-drop": FileDrop;
        "file-preview": FilePreview;
        "progress-bar": ProgressBar;
        "uploaded-file": UploadedFile;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "bard-file": LocalJSX.BardFile & JSXBase.HTMLAttributes<HTMLBardFileElement>;
            "file-drop": LocalJSX.FileDrop & JSXBase.HTMLAttributes<HTMLFileDropElement>;
            "file-preview": LocalJSX.FilePreview & JSXBase.HTMLAttributes<HTMLFilePreviewElement>;
            "progress-bar": LocalJSX.ProgressBar & JSXBase.HTMLAttributes<HTMLProgressBarElement>;
            "uploaded-file": LocalJSX.UploadedFile & JSXBase.HTMLAttributes<HTMLUploadedFileElement>;
        }
    }
}
