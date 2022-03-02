import { createStore, Store } from 'redux';
import { State } from '../models/state.interface';
import { reducer } from './reducer';
export const CryptoStore: Store<State> = createStore(reducer);