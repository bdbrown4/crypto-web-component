import { StyleLoaderService } from '../services/style-loader.service';
import btcStyles from '../styles/btc-img-component.scss';
import template from '../templates/btc-img-component.html';

export class BtcImgComponent extends HTMLElement {
    private styleLoaderService: StyleLoaderService = new StyleLoaderService();
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = template;
        this.styleLoaderService.loadStylesIntoShadowRoot(btcStyles, this.shadowRoot);
    }

    connectedCallback(): void {
        
    }

    disconnectedCallback(): void {
        
    }
}

window.customElements.define('btc-img-component', BtcImgComponent);