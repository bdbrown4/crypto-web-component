import { CryptoDataListComponent } from '../components/crypto-data-list-component';
import { enableFetchMocks } from 'jest-fetch-mock';
import { CryptoButtonComponent } from '../components/crypto-button-component';
import { CryptoStore } from '../redux/store';
import { SelectedCryptoTickerAction } from '../redux/actions';
import { CryptoWebComponent } from '../components/crypto-web-component';

describe('CryptoDataListComponent', () => {
    const component = new CryptoDataListComponent();
    beforeEach(() => {
        enableFetchMocks();
    });
    it('should define the component', () => {
        expect(component).toBeTruthy();
    });
    it('should call fetchDataListOptions and that should add options to the datalist', async () => {
        fetchMock.dontMock();
        await component.fetchDataListOptions();
        const datalist = component.shadowRoot.querySelector('#cryptocurrencies');
        expect(datalist.children[0]).toBeTruthy();
        expect(datalist.firstElementChild.tagName).toBe('OPTION');
    });
});

describe('CryptoButtonComponent', () => {
    const parentComponent = new CryptoWebComponent();
    const component = new CryptoButtonComponent();
    beforeEach(() => {
        enableFetchMocks();
    });
    it('should define the component', () => {
        expect(parentComponent).toBeTruthy();
        expect(component).toBeTruthy();
    });
    it('should call fetchCryptoCurrency', async () => {
        CryptoStore.dispatch(SelectedCryptoTickerAction.loadSelectedCryptoTickerSuccess("btc"));
        fetchMock.dontMock();
        await component.fetchCryptoCurrency();
        const div = parentComponent.shadowRoot.querySelector('#cryptovalue');
    
        expect(div.children[0]).toBeTruthy();
        expect(div.children[0].textContent.includes('$')).toBeTruthy();
    });
});