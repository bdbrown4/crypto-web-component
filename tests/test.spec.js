const { define } = require('../crypto-web-component');
describe('CryptoWebComponent', () => {
    let component;
    beforeEach(() => {
        component = define(`
        <body>
            <input list='cryptocurrencies' id='cryptocurrency'>
            <datalist id='cryptocurrencies'>
            </datalist>
            <button disabled='true' id='fetchCryptoValue'>Fetch a cryptocurrency</button>
            <div id='cryptovalue' hidden='true'>
            </div>
        </body>`);
    });
    it('should define the component', () => {
        expect(component).toBeTruthy();
    });
    // come back to this test.... its a false positive
    // it('should call fetchCryptoCurrency', () => {
    //     const input = component.shadowRoot.querySelector('#cryptocurrency');
    //     const button = component.shadowRoot.querySelector('#fetchCryptoValue');
    //     input.value = 'BTC';

    //     button.click();
    //     const div = component.shadowRoot.querySelector('#cryptovalue');

    //     console.log(div.children);
    //     expect(div.hasChildNodes()).toBeTruthy();
    // });
    it('should call fetchDataListOptions and that should add options to the datalist', async () => {
        await component.fetchDataListOptions();
        const datalist = component.shadowRoot.querySelector('#cryptocurrencies');
        expect(datalist.children[0]).toBeTruthy();
        expect(datalist.firstElementChild.tagName).toBe('OPTION');
    });
});