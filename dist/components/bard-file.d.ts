import type { Components, JSX } from "../types/components";

interface BardFile extends Components.BardFile, HTMLElement {}
export const BardFile: {
    prototype: BardFile;
    new (): BardFile;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
