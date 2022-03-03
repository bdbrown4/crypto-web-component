import { BtcImgTemplate } from "./btc-img-template.interface";
import { CryptoButtonTemplate } from "./crypto-button-template.interface";
import { CryptoDataListTemplate } from "./crypto-data-list-template.interface";
import { CryptoWebTemplate } from "./crypto-web-template.interface";

export interface WebComponentTemplateState {
    btcImgTemplate: BtcImgTemplate;
    cryptoDataListTemplate: CryptoDataListTemplate;
    cryptoWebTemplate: CryptoWebTemplate;
    cryptoButtonTemplate: CryptoButtonTemplate;
}