import type { Components, JSX } from "../types/components";

interface AttachmentPreview extends Components.AttachmentPreview, HTMLElement {}
export const AttachmentPreview: {
    prototype: AttachmentPreview;
    new (): AttachmentPreview;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
