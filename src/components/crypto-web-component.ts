import cryptoStyles from '../styles/crypto-web-component.scss';
import 'regenerator-runtime/runtime.js';
import './btc-img-component';
import './crypto-data-list-component';
import './crypto-button-component';
import template from '../templates/crypto-web-component.html';
import { StyleLoaderService } from '../services/style-loader.service';
import { CryptoStore } from '../redux/store';
import { LoadCryptoWebTemplateAction } from '../redux/actions';

export class CryptoWebComponent extends HTMLElement {
    private styleLoaderService: StyleLoaderService = new StyleLoaderService();

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = template;
        CryptoStore.dispatch(LoadCryptoWebTemplateAction.loadCryptoWebTemplateSuccess({ cryptoWebShadowRoot: this.shadowRoot }));
        this.styleLoaderService.loadStylesIntoShadowRoot(cryptoStyles, this.shadowRoot);
    }

    connectedCallback(): void {
        
    }

    disconnectedCallback(): void {

    }
}

window.customElements.define('crypto-web-component', CryptoWebComponent);