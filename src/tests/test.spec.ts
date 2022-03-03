import { CryptoDataListComponent } from '../components/crypto-data-list-component';
import { enableFetchMocks } from 'jest-fetch-mock';

describe('CryptoDataListComponent', () => {
    const component = new CryptoDataListComponent();
    beforeEach(() => {
        enableFetchMocks();
    });
    it('should define the component', () => {
        expect(component).toBeTruthy();
    });
    // it('should call fetchCryptoCurrency', async () => {
    //     component.setCryptoCurrencyValue = 'btc';
    //     fetchMock.dontMock();
    //     await component.fetchCryptoCurrency();
    //     const div = component.shadowRoot.querySelector('#cryptovalue');

    //     expect(div.children[0]).toBeTruthy();
    //     expect(div.children[0].textContent.includes('$')).toBeTruthy();
    // });
    it('should call fetchDataListOptions and that should add options to the datalist', async () => {
        fetchMock.dontMock();
        await component.fetchDataListOptions();
        const datalist = component.shadowRoot.querySelector('#cryptocurrencies');
        expect(datalist.children[0]).toBeTruthy();
        expect(datalist.firstElementChild.tagName).toBe('OPTION');
    });
    // write more tests...
});