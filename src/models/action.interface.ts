import { Action } from 'redux';

export default interface IAction<T> extends Action<string> {
    type: string;
    payload?: T | T[];
    error?: boolean;
    meta?: any;
}