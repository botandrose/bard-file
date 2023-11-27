/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface BardFile {
        "accepts": string;
        "directupload": string;
        "max": number;
        "multiple": boolean;
        "name": string;
        "required": boolean;
    }
    interface FileDrop {
        /**
          * The id of the an input[type=file] to assign dropped files to
         */
        "target": string;
    }
    interface ProgressBar {
        "percent": number;
    }
    interface UploadedFile {
        "accepts": string;
        "filename": string;
        "max": number;
        "mimetype": string;
        "name": string;
        "size": number;
        "src": string;
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
    interface HTMLProgressBarElement extends Components.ProgressBar, HTMLStencilElement {
    }
    var HTMLProgressBarElement: {
        prototype: HTMLProgressBarElement;
        new (): HTMLProgressBarElement;
    };
    interface HTMLUploadedFileElementEventMap {
        "remove": any;
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
        "progress-bar": HTMLProgressBarElement;
        "uploaded-file": HTMLUploadedFileElement;
    }
}
declare namespace LocalJSX {
    interface BardFile {
        "accepts"?: string;
        "directupload"?: string;
        "max"?: number;
        "multiple"?: boolean;
        "name"?: string;
        "required"?: boolean;
    }
    interface FileDrop {
        /**
          * The id of the an input[type=file] to assign dropped files to
         */
        "target"?: string;
    }
    interface ProgressBar {
        "percent"?: number;
    }
    interface UploadedFile {
        "accepts"?: string;
        "filename"?: string;
        "max"?: number;
        "mimetype"?: string;
        "name"?: string;
        "onRemove"?: (event: UploadedFileCustomEvent<any>) => void;
        "size"?: number;
        "src"?: string;
        "value"?: string;
    }
    interface IntrinsicElements {
        "bard-file": BardFile;
        "file-drop": FileDrop;
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
            "progress-bar": LocalJSX.ProgressBar & JSXBase.HTMLAttributes<HTMLProgressBarElement>;
            "uploaded-file": LocalJSX.UploadedFile & JSXBase.HTMLAttributes<HTMLUploadedFileElement>;
        }
    }
}
