// const local = '../node_modules/crypto-web-component/templates/crypto-web-component.html';
// const github = 'https://github.com/bdbrown4/crypto-web-component/blob/main/templates/crypto-web-component.html';
// this is having issues when installed into another application because of cors
// fetch(local)
//     .then(stream => stream.text())
//     .then(text => define(text));
const template = `
<body>
    <input list='cryptocurrencies' id='cryptocurrency'>
    <datalist id='cryptocurrencies'>
    </datalist>
    <button disabled='true' id='fetchCryptoValue'>Fetch a cryptocurrency</button>
    <div id='cryptovalue' hidden='true'>
    </div>
</body>`;

class CryptoWebComponent extends HTMLElement {
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
            .removeEventListener();
        this.shadowRoot.querySelector('#cryptocurrency')
            .removeEventListener();
    }

    async fetchDataListOptions() {
        var uri = 'https://api.exchange.coinbase.com/currencies';
        var response = await fetch(uri, {
            method: 'GET'
        }).then(data => data.json())
          .catch(err => console.log(err));

        var datalist = this.shadowRoot.querySelector('#cryptocurrencies');

        response.forEach(crypto => {
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
        
        const div = this.shadowRoot.querySelector('#cryptovalue');
        const para = document.createElement('p');
        para.innerHTML = response.message ?
            `There was an error fetching ${this.cryptoCurrency} from Coinbase.` :
            '$' + parseFloat(response.price * 100 / 100).toFixed(2);
        if (div.firstChild) {
            div.removeChild(div.firstChild);
        }
        div.appendChild(para);
        div.hidden = false;
    }

    activateButton() {
        const div = this.shadowRoot.querySelector('#cryptovalue');
        div.innerHTML = '';
        div.hidden = true;
        const selection = this.shadowRoot.querySelector('#cryptocurrency');
        this.cryptoCurrency = selection.value;
        if (this.cryptoCurrency) {
            this.shadowRoot.querySelector('#fetchCryptoValue').disabled = false;
        } else {
            this.shadowRoot.querySelector('#fetchCryptoValue').disabled = true;
        }
    }
}

window.customElements.define('crypto-web-component', CryptoWebComponent);

if(typeof exports === "object") {
    module.exports.CryptoWebComponent = CryptoWebComponent;
}