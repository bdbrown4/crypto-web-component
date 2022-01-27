import './styles/crypto-web-component.scss';
import 'regenerator-runtime/runtime.js';
import template from './templates/crypto-web-component.html';

export class CryptoWebComponent extends HTMLElement {
    cryptoCurrency = '';
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
        var uri = 'https://api.exchange.coinbase.com/currencies';
        var response = await fetch(uri, {
            method: 'GET'
        }).then(data => data.json())
          .catch(err => console.log(err));

        var datalist = this.shadowRoot.querySelector('#cryptocurrencies');

        response.forEach((crypto: { id: string; name: any; }) => {
            const option = document.createElement('option');
            option.value = crypto.id;
            option.innerText = `${crypto.name} - ${crypto.id}`;
            datalist.appendChild(option);
        });
    }

    async fetchCryptoCurrency() {
        var uri = `https://api.exchange.coinbase.com/products/${this.cryptoCurrency}-usd/ticker`;
        var response = await fetch(uri, {
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

    activateButton() {
        const div: HTMLDivElement = this.shadowRoot.querySelector('#cryptovalue');
        div.innerHTML = '';
        div.hidden = true;
        const selection: HTMLInputElement = this.shadowRoot.querySelector('#cryptocurrency');
        this.cryptoCurrency = selection.value;
        const button: HTMLButtonElement = this.shadowRoot.querySelector('#fetchCryptoValue');
        if (this.cryptoCurrency) {
            button.disabled = false;
        } else {
            button.disabled = true;
        }
    }

    formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      });
}

window.customElements.define('crypto-web-component', CryptoWebComponent);