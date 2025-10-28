import type { Components, JSX } from "../types/components";

interface InputAttachment extends Components.InputAttachment, HTMLElement {}
export const InputAttachment: {
    prototype: InputAttachment;
    new (): InputAttachment;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
