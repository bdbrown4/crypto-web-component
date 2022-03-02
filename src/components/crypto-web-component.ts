import cryptoStyles from '../styles/crypto-web-component.scss';
import 'regenerator-runtime/runtime.js';
import './btc-img-component';
import template from '../templates/crypto-web-component.html';
import { CryptoData } from '../models/crypto-data.interface';
import { CryptoTicker } from '../models/crypto-ticker.interface';
import { StyleLoaderService } from '../services/style-loader.service';

export class CryptoWebComponent extends HTMLElement {
    private cryptoCurrency: string = '';
    private styleLoaderService: StyleLoaderService = new StyleLoaderService();
    public get cryptoCurrencyValue(): string {
        return this.cryptoCurrency;
    }
    public set setCryptoCurrencyValue(val: string) {
        this.cryptoCurrency = val;
    }
    private readonly formatter: Intl.NumberFormat = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = template;
        this.styleLoaderService.loadStylesIntoShadowRoot(cryptoStyles, this.shadowRoot);
        this.fetchDataListOptions();
    }

    connectedCallback(): void {
        this.shadowRoot.querySelector('#fetchCryptoValue')
            .addEventListener('click', this.fetchCryptoCurrency.bind(this));
        this.shadowRoot.querySelector('#cryptocurrency')
            .addEventListener('input', this.activateButton.bind(this));
    }

    disconnectedCallback(): void {
        this.shadowRoot.querySelector('#fetchCryptoValue')
            .removeEventListener('click', this.fetchCryptoCurrency.bind(this));
        this.shadowRoot.querySelector('#cryptocurrency')
            .removeEventListener('input', this.activateButton.bind(this));
    }

    async fetchDataListOptions(): Promise<void> {
        const uri: string = 'https://api.exchange.coinbase.com/currencies';
        const response: CryptoData[] = await fetch(uri, {
            method: 'GET'
        }).then(data => data.json())
            .catch(err => console.log(err));

        const datalist = this.shadowRoot.querySelector('#cryptocurrencies');

        response.forEach((crypto) => {
            const option = document.createElement('option');
            option.value = crypto.id;
            option.innerText = `${crypto.name} - ${crypto.id}`;
            datalist.appendChild(option);
        });
    }

    async fetchCryptoCurrency(): Promise<void> {
        const uri: string = `https://api.exchange.coinbase.com/products/${this.cryptoCurrency}-usd/ticker`;
        const response: CryptoTicker = await fetch(uri, {
            method: 'GET'
        }).then(data => data.json())
            .catch(err => console.log(err));

        const div: HTMLDivElement = this.shadowRoot.querySelector('#cryptovalue');
        const para: HTMLParagraphElement = document.createElement('p');
        para.setAttribute('part', 'p');
        para.innerHTML = response.message ?
            `There was an error fetching ${this.cryptoCurrency} from Coinbase.` :
            this.formatter.format(response.price * 100 / 100);
        if (div.firstChild) {
            div.removeChild(div.firstChild);
        }
        div.appendChild(para);
        div.hidden = false;
    }

    private activateButton(): void {
        const div: HTMLDivElement = this.shadowRoot.querySelector('#cryptovalue');
        div.innerHTML = '';
        div.hidden = true;
        const selection: HTMLInputElement = this.shadowRoot.querySelector('#cryptocurrency');
        this.setCryptoCurrencyValue = selection.value;
        const button: HTMLButtonElement = this.shadowRoot.querySelector('#fetchCryptoValue');
        button.disabled = this.cryptoCurrency ? false : true;
    }
}

window.customElements.define('crypto-web-component', CryptoWebComponent);