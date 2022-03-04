export class StyleLoaderService {
    constructor() { }

    public loadStylesIntoShadowRoot(styleSheetText: string, shadowRoot: ShadowRoot): void {
        const styles = document.createElement('style');
        styles.appendChild(document.createTextNode(styleSheetText));
        shadowRoot.appendChild(styles);
    }
}