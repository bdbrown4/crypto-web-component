import { State } from "../models/state.interface";
import IAction from "../models/action.interface";
import * as CryptoActions from "./actions";
import { CryptoActionUnion } from "../types/crypto-action-union.type";

const initialState: State = {
    cryptoData: {
        id: '',
        name: ''
    },
    cryptoTicker: {
        price: 0
    },
    selectedCryptoTicker: '',
    uiTemplateState: {
        btcImgTemplate: null,
        cryptoDataListTemplate: null,
        cryptoWebTemplate: null
    }
};

export const reducer = (state: State = initialState, action: IAction<CryptoActionUnion>) => {
    switch(action.type) {
        case CryptoActions.CryptoDataAction.LOAD_CRYPTO_DATA_LIST_SUCCESS: {
            return { ...state, cryptoData: action.payload };
        }
        case CryptoActions.CryptoTickerAction.LOAD_CRYPTO_TICKER_DATA_SUCCESS: {
            return { ...state, cryptoTicker: action.payload };
        }
        case CryptoActions.SelectedCryptoTickerAction.LOAD_SELECTED_CRYPTO_TICKER_SUCCESS: {
            return { ...state, selectedCryptoTicker: action.payload };
        }
        case CryptoActions.LoadBtcImgTemplateAction.LOAD_BTC_IMG_TEMPLATE_SUCCESS: {
            return { ...state, uiTemplateState: { ...state.uiTemplateState, btcImgTemplate: action.payload } };
        }
        case CryptoActions.LoadCryptoDataListTemplateAction.LOAD_CRYPTO_DATA_LIST_TEMPLATE_SUCCESS: {
            return { ...state, uiTemplateState: { ...state.uiTemplateState, cryptoDataListTemplate: action.payload } };
        }
        case CryptoActions.LoadCryptoWebTemplateAction.LOAD_CRYPTO_WEB_TEMPLATE_SUCCESS: {
            return { ...state, uiTemplateState: { ...state.uiTemplateState, cryptoWebTemplate: action.payload } };
        }
        default: {
            return state;
        }
    }
};