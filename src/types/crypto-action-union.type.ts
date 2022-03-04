import { ComponentTemplate } from "../models/component-template.interface";
import { CryptoData } from "../models/crypto-data.interface";
import { CryptoTicker } from "../models/crypto-ticker.interface";

export type CryptoActionUnion = void | CryptoTicker | CryptoData | ComponentTemplate | string;