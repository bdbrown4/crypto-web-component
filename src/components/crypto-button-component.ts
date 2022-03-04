import template from '../templates/crypto-button-component.html';
import cryptoStyles from '../styles/crypto-button-component.scss';
import { CryptoTicker } from "../models/crypto-ticker.interface";
import { State } from "../models/state.interface";
import { CryptoTickerAction, LoadCryptoButtonTemplateAction } from "../redux/actions";
import { CryptoStore } from "../redux/store";
import { StyleLoaderService } from "../services/style-loader.service";

export class CryptoButtonComponent extends HTMLElement {
    private styleLoaderService: StyleLoaderService = new StyleLoaderService();
    private readonly formatter: Intl.NumberFormat = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = template;
        CryptoStore.dispatch(LoadCryptoButtonTemplateAction.loadCryptoButtonTemplateSuccess({ componentShadowRoot: this.shadowRoot }));
        this.styleLoaderService.loadStylesIntoShadowRoot(cryptoStyles, this.shadowRoot);
    }

    connectedCallback(): void {
        this.shadowRoot.querySelector('#fetchCryptoValue')
            .addEventListener('click', this.fetchCryptoCurrency.bind(this));
    }

    disconnectedCallback(): void {
        this.shadowRoot.querySelector('#fetchCryptoValue')
            .removeEventListener('click', this.fetchCryptoCurrency.bind(this));
    }

    async fetchCryptoCurrency(): Promise<void> {
        const state: State = CryptoStore.getState();
        const uri: string = `https://api.exchange.coinbase.com/products/${state.selectedCryptoTicker}-usd/ticker`;
        const response: CryptoTicker = await fetch(uri, {
            method: 'GET'
        }).then(data => data.json())
            .catch(err => console.log(err));

        CryptoStore.dispatch(CryptoTickerAction.loadCryptoTickerSuccess(response));
        const div: HTMLDivElement = state.uiTemplateState.cryptoWebTemplate.componentShadowRoot.querySelector('#cryptovalue');
        const para: HTMLParagraphElement = document.createElement('p');
        para.setAttribute('part', 'p');
        para.innerHTML = response.message ?
            `There was an error fetching ${state.selectedCryptoTicker} from Coinbase.` :
            this.formatter.format(response.price * 100 / 100);
        if (div.firstChild) {
            div.removeChild(div.firstChild);
        }
        div.appendChild(para);
        div.hidden = false;
    }
}

window.customElements.define('crypto-button-component', CryptoButtonComponent);