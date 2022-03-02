import { State } from "../models/state.interface";
import IAction from "../models/action.interface";
import { CryptoActionUnion, CryptoDataAction, CryptoTickerAction, SelectedCryptoTickerAction } from "./actions";

const initialState: State = {
    cryptoData: {
        id: '',
        name: ''
    },
    cryptoTicker: {
        price: 0
    },
    selectedCryptoTicker: ''
};

export const reducer = (state: State = initialState, action: IAction<CryptoActionUnion>) => {
    switch(action.type) {
        case CryptoDataAction.LOAD_CRYPTO_DATA_LIST_SUCCESS: {
            return { ...state, cryptoData: action.payload };
        }
        case CryptoTickerAction.LOAD_CRYPTO_TICKER_DATA_SUCCESS: {
            return { ...state, cryptoTicker: action.payload };
        }
        case SelectedCryptoTickerAction.LOAD_SELECTED_CRYPTO_TICKER_SUCCESS: {
            return { ...state, selectedCryptoTicker: action.payload };
        }
        default: {
            return state;
        }
    }
};