interface Item {
    href: string;
    text: string;
}
declare class TableOfContentsComponent extends HTMLElement {
    constructor();
    connectedCallback(): void;
    render(): void;
}
