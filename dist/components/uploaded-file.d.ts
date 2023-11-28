import type { Components, JSX } from "../types/components";

interface UploadedFile extends Components.UploadedFile, HTMLElement {}
export const UploadedFile: {
    prototype: UploadedFile;
    new (): UploadedFile;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
