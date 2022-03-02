import { CryptoData } from "./crypto-data.interface";
import { CryptoTicker } from "./crypto-ticker.interface";

export class State {
    cryptoData: CryptoData;
    cryptoTicker: CryptoTicker;
    selectedCryptoTicker: string;
}