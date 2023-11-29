import type { Components, JSX } from "../types/components";

interface FilePreview extends Components.FilePreview, HTMLElement {}
export const FilePreview: {
    prototype: FilePreview;
    new (): FilePreview;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
