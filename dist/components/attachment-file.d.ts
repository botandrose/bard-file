import type { Components, JSX } from "../types/components";

interface AttachmentFile extends Components.AttachmentFile, HTMLElement {}
export const AttachmentFile: {
    prototype: AttachmentFile;
    new (): AttachmentFile;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
