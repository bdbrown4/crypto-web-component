import { State } from "../models/state.interface";
import { Action } from 'redux';

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

export const reducer = (state: State = initialState, action: Action) => {
    switch(action.type) {
        case '': {
            return state;
        }
        default: {
            return state;
        }
    }
};