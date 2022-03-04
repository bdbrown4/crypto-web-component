import { CryptoData } from "../models/crypto-data.interface";
import { CryptoTicker } from "../models/crypto-ticker.interface";
import { CryptoDataAction } from "../redux/actions";
import { CryptoStore } from "../redux/store";

export class FetchCoinbaseService {
    constructor() { }

    async fetchCryptoDataList(uri: string): Promise<CryptoData[]> {
        return await fetch(uri, {
            method: 'GET'
        }).then((data) => {
            CryptoStore.dispatch(CryptoDataAction.loadCryptoDataSuccess(data as unknown as CryptoData[]));
            return data.json();
        })
            .catch(err => console.log(err));
    }

    async fetchCryptoCurrency(uri: string): Promise<CryptoTicker> {
        return await fetch(uri, {
            method: 'GET'
        }).then(data => data.json())
            .catch(err => console.log(err));
    }
}