export interface ICcyCategory {
  name: string;
  instruments: Instrument[];
}

export interface Instrument {
  alias: string;
  tickSize: number;
  priceFormat: string;
}
export enum CcyPriceDirection {
  None = 0,
  Up = 1,
  Down = 2
}
export interface IMarketData {
  instrument: string;
  priceLevels: IPriceLevel[];
}
export interface IPriceLevel {
  level: number;
  bid?: number;
  ask?: number;
  direction?: CcyPriceDirection;
  bidSize?: number;
  askSize?: number;
  delta?: number;
}
