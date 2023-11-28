export declare class FileDrop {
    el: HTMLElement;
    /**
     * The id of the an input[type=file] to assign dropped files to
     */
    for: string;
    private get fileTarget();
    openFilePicker(_event: any): void;
    highlight(event: any): void;
    unhighlight(event: any): void;
    drop(event: any): void;
}
