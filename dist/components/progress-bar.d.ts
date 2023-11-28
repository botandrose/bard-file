import type { Components, JSX } from "../types/components";

interface ProgressBar extends Components.ProgressBar, HTMLElement {}
export const ProgressBar: {
    prototype: ProgressBar;
    new (): ProgressBar;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
