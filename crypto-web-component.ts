import './styles/crypto-web-component.scss';
import 'regenerator-runtime/runtime.js';
import template from './templates/crypto-web-component.html';

export class CryptoWebComponent extends HTMLElement {
    private cryptoCurrency: string = '';
    public get cryptoCurrencyValue() {
        return this.cryptoCurrency;
    }
    public set setCryptoCurrencyValue(val: string) {
        this.cryptoCurrency = val;
    }
    private readonly formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      });

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = template;
        this.fetchDataListOptions();
    }

    connectedCallback() {
        this.shadowRoot.querySelector('#fetchCryptoValue')
            .addEventListener('click', this.fetchCryptoCurrency.bind(this));
        this.shadowRoot.querySelector('#cryptocurrency')
            .addEventListener('input', this.activateButton.bind(this));
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector('#fetchCryptoValue')
            .removeEventListener('click', this.fetchCryptoCurrency.bind(this));
        this.shadowRoot.querySelector('#cryptocurrency')
            .removeEventListener('input', this.activateButton.bind(this));
    }

    async fetchDataListOptions() {
        const uri = 'https://api.exchange.coinbase.com/currencies';
        const response = await fetch(uri, {
            method: 'GET'
        }).then(data => data.json())
          .catch(err => console.log(err));

        const datalist = this.shadowRoot.querySelector('#cryptocurrencies');

        response.forEach((crypto: { id: string; name: any; }) => {
            const option = document.createElement('option');
            option.value = crypto.id;
            option.innerText = `${crypto.name} - ${crypto.id}`;
            datalist.appendChild(option);
        });
    }

    async fetchCryptoCurrency() {
        const uri = `https://api.exchange.coinbase.com/products/${this.cryptoCurrency}-usd/ticker`;
        const response = await fetch(uri, {
            method: 'GET'
        }).then(data => data.json());
        
        const div: HTMLDivElement = this.shadowRoot.querySelector('#cryptovalue');
        const para = document.createElement('p');
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

    private activateButton() {
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