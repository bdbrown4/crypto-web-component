fetch('../templates/crypto-web-component.html')
    .then(stream => stream.text())
    .then(text => define(text));

/*  
    Never ever do this in a production scenario where you need to protect your endpoints
    from nurds.
*/
const apiKey = '29416EA8-E343-43F4-A5DC-6C360653D6A4';

function define(html) {
    class CryptoWebComponent extends HTMLElement {
        cryptoCurrency = "";
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
            this.shadowRoot.innerHTML = html;
        }
    
        connectedCallback() {
            this.shadowRoot.querySelector('#fetchCryptoValue')
                .addEventListener('click', this.fetchCryptoCurrency.bind(this));
            this.shadowRoot.querySelector("#cryptocurrency")
                .addEventListener('change', this.activateButton.bind(this));
        }
    
        disconnectedCallback() {
            this.shadowRoot.querySelector('#fetchCryptoValue')
                .removeEventListener();
            this.shadowRoot.querySelector("#cryptocurrency")
                .removeEventListener();
        }
    
        async fetchCryptoCurrency() {
            var uri = `https://rest.coinapi.io/v1/exchangerate/${this.cryptoCurrency}/USD`;
            var response = await fetch(uri, {
                method: 'GET',
                headers: {
                    'X-CoinAPI-Key': apiKey
                }
            }).then(data => data.json());

            const div = this.shadowRoot.querySelector("#cryptovalue");
            const para = document.createElement("p");
            para.innerHTML = 'USD: $'+(Math.round(response.rate * 100) / 100).toLocaleString();
            div.appendChild(para);
            div.hidden = false;
            console.log(response);
        }

        activateButton() {
            const div = this.shadowRoot.querySelector("#cryptovalue");
            div.innerHTML = "";
            div.hidden = true;
            const selection = this.shadowRoot.querySelector("#cryptocurrency");
            this.cryptoCurrency = selection.options[selection.selectedIndex].value;
            if (this.cryptoCurrency) {
                this.shadowRoot.querySelector("#fetchCryptoValue").disabled = false;
            } else {
                this.shadowRoot.querySelector("#fetchCryptoValue").disabled = true;
            }
        }
    }
    
    window.customElements.define('crypto-web-component', CryptoWebComponent);
}