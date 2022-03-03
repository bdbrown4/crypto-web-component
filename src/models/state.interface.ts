import { CryptoData } from "./crypto-data.interface";
import { CryptoTicker } from "./crypto-ticker.interface";
import { WebComponentTemplateState } from "./web-component-template-state.interface";

export class State {
    cryptoData: CryptoData;
    cryptoTicker: CryptoTicker;
    selectedCryptoTicker: string;
    uiTemplateState: WebComponentTemplateState;
}