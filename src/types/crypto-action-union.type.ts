import { BtcImgTemplate } from "../models/btc-img-template.interface";
import { CryptoDataListTemplate } from "../models/crypto-data-list-template.interface";
import { CryptoData } from "../models/crypto-data.interface";
import { CryptoTicker } from "../models/crypto-ticker.interface";
import { CryptoWebTemplate } from "../models/crypto-web-template.interface";

export type CryptoActionUnion = void | CryptoTicker | CryptoData | BtcImgTemplate | CryptoDataListTemplate | CryptoWebTemplate | string;