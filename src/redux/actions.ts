import IAction from "../models/action.interface";
import { BtcImgTemplate } from "../models/btc-img-template.interface";
import { CryptoDataListTemplate } from "../models/crypto-data-list-template.interface";
import { CryptoData } from "../models/crypto-data.interface";
import { CryptoTicker } from "../models/crypto-ticker.interface";
import { CryptoWebTemplate } from "../models/crypto-web-template.interface";

export class CryptoDataAction {
    public static readonly LOAD_CRYPTO_DATA_LIST_SUCCESS: string = '[Crypto Web Component] LOAD_CRYPTO_DATA_LIST_SUCCESS';

    public static loadCryptoDataSuccess(model: CryptoData[]): IAction<CryptoData> {
        return {
            payload: model,
            type: CryptoDataAction.LOAD_CRYPTO_DATA_LIST_SUCCESS,
        };
    }
}

export class CryptoTickerAction {
    public static readonly LOAD_CRYPTO_TICKER_DATA_SUCCESS: string = '[Crypto Web Component] LOAD_CRYPTO_TICKER_DATA_SUCCESS';

    public static loadCryptoTickerSuccess(model: CryptoTicker): IAction<CryptoTicker> {
        return {
            payload: model,
            type: CryptoTickerAction.LOAD_CRYPTO_TICKER_DATA_SUCCESS,
        };
    }
}

export class SelectedCryptoTickerAction {
    public static readonly LOAD_SELECTED_CRYPTO_TICKER_SUCCESS: string = '[Crypto Web Component] LOAD_SELECTED_CRYPTO_TICKER_SUCCESS';

    public static loadSelectedCryptoTickerSuccess(model: string): IAction<string> {
        return {
            payload: model,
            type: SelectedCryptoTickerAction.LOAD_SELECTED_CRYPTO_TICKER_SUCCESS,
        };
    }
}

export class LoadBtcImgTemplateAction {
    public static readonly LOAD_BTC_IMG_TEMPLATE_SUCCESS: string = '[Crypto Web Component] LOAD_BTC_IMG_TEMPLATE_SUCCESS';

    public static loadBtcImgTemplateSuccess(model: BtcImgTemplate): IAction<BtcImgTemplate> {
        return {
            payload: model,
            type: LoadBtcImgTemplateAction.LOAD_BTC_IMG_TEMPLATE_SUCCESS,
        };
    }
}

export class LoadCryptoDataListTemplateAction {
    public static readonly LOAD_CRYPTO_DATA_LIST_TEMPLATE_SUCCESS: string = '[Crypto Web Component] LOAD_CRYPTO_DATA_LIST_TEMPLATE_SUCCESS';

    public static loadCryptoDataListTemplateSuccess(model: CryptoDataListTemplate): IAction<CryptoDataListTemplate> {
        return {
            payload: model,
            type: LoadCryptoDataListTemplateAction.LOAD_CRYPTO_DATA_LIST_TEMPLATE_SUCCESS,
        };
    }
}

export class LoadCryptoWebTemplateAction {
    public static readonly LOAD_CRYPTO_WEB_TEMPLATE_SUCCESS: string = '[Crypto Web Component] LOAD_CRYPTO_WEB_TEMPLATE_SUCCESS';

    public static loadCryptoWebTemplateSuccess(model: CryptoWebTemplate): IAction<CryptoWebTemplate> {
        return {
            payload: model,
            type: LoadCryptoWebTemplateAction.LOAD_CRYPTO_WEB_TEMPLATE_SUCCESS,
        };
    }
}
