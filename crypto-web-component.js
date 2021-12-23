fetch('../templates/crypto-web-component.html')
    .then(stream => stream.text())
    .then(text => define(text));

/*  Never ever do this in a production scenario where you need to protect your endpoints
    from nurds.
*/
const apiKey = '29416EA8-E343-43F4-A5DC-6C360653D6A4';

function define(html) {
    class CryptoWebComponent extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
            this.shadowRoot.innerHTML = html;
        }
    
        connectedCallback() {
            this.shadowRoot.querySelector('#fetchCryptoValue')
                .addEventListener('click', this.fetchCryptoCurrency.bind(this));
        }
    
        disconnectedCallback() {
            this.shadowRoot.querySelector('#fetchCryptoValue')
                .removeEventListener();
        }
    
        async fetchCryptoCurrency() {
            var uri = 'https://rest.coinapi.io/v1/exchangerate/BTC/USD';
            var response = await fetch(uri, {
                method: 'GET',
                headers: {
                    'X-CoinAPI-Key': apiKey
                }
            }).then(data => data.json());
            console.log(response);
        }
    }
    
    window.customElements.define('crypto-web-component', CryptoWebComponent);
}