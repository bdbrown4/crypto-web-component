import template from '../templates/crypto-data-list-component.html';
import cryptoStyles from '../styles/crypto-data-list-component.scss';
import { StyleLoaderService } from '../services/style-loader.service';
import { CryptoStore } from '../redux/store';
import { CryptoDataAction, LoadCryptoDataListTemplateAction, SelectedCryptoTickerAction } from '../redux/actions';
import { CryptoData } from '../models/crypto-data.interface';
import { State } from '../models/state.interface';

export class CryptoDataListComponent extends HTMLElement {
    private cryptoCurrency: string = '';
    public get cryptoCurrencyValue(): string {
        return this.cryptoCurrency;
    }
    public set setCryptoCurrencyValue(val: string) {
        this.cryptoCurrency = val;
        CryptoStore.dispatch(SelectedCryptoTickerAction.loadSelectedCryptoTickerSuccess(val));
    }
    private styleLoaderService: StyleLoaderService = new StyleLoaderService();
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = template;
        CryptoStore.dispatch(LoadCryptoDataListTemplateAction.loadCryptoDataListTemplateSuccess({ cryptoDataListShadowRoot: this.shadowRoot }));
        this.styleLoaderService.loadStylesIntoShadowRoot(cryptoStyles, this.shadowRoot);
        this.fetchDataListOptions();
    }

    connectedCallback(): void {
        this.shadowRoot.querySelector('#cryptocurrency')
            .addEventListener('input', this.activateButton.bind(this));
    }

    disconnectedCallback(): void {
        this.shadowRoot.querySelector('#cryptocurrency')
            .removeEventListener('input', this.activateButton.bind(this));
    }

    async fetchDataListOptions(): Promise<void> {
        const uri: string = 'https://api.exchange.coinbase.com/currencies';
        const response: CryptoData[] = await fetch(uri, {
            method: 'GET'
        }).then(data => data.json())
            .catch(err => console.log(err));

        CryptoStore.dispatch(CryptoDataAction.loadCryptoDataSuccess(response));

        const datalist = this.shadowRoot.querySelector('#cryptocurrencies');

        response.forEach((crypto) => {
            const option = document.createElement('option');
            option.value = crypto.id;
            option.innerText = `${crypto.name} - ${crypto.id}`;
            datalist.appendChild(option);
        });
    }

    private activateButton(): void {
        const state: State = CryptoStore.getState();
        const div: HTMLDivElement = state.uiTemplateState.cryptoWebTemplate.cryptoWebShadowRoot.querySelector('#cryptovalue');
        div.innerHTML = '';
        div.hidden = true;
        const selection: HTMLInputElement = this.shadowRoot.querySelector('#cryptocurrency');
        this.setCryptoCurrencyValue = selection.value;
        const button: HTMLButtonElement = state.uiTemplateState.cryptoButtonTemplate.cryptoButtonShadowRoot.querySelector('#fetchCryptoValue');
        button.disabled = this.cryptoCurrency ? false : true;
    }
}

window.customElements.define('crypto-data-list-component', CryptoDataListComponent);