import type { Components, JSX } from "../types/components";

interface FileDrop extends Components.FileDrop, HTMLElement {}
export const FileDrop: {
    prototype: FileDrop;
    new (): FileDrop;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
