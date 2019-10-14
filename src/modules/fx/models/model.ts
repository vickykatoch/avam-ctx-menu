import { Observable } from 'rxjs';

export interface ICcyCategory {
  name: string;
  instruments: Instrument[];
}
export interface IAugmentedCcyCategory {
    name: string;
    instrumentsWithMktData: InstrumentMarketData[];
}

export interface Instrument {
  alias: string;
  tickSize: number;
  priceFormat: string;
}
export interface InstrumentMarketData {
    instrument: Instrument;
    marketData$: Observable<IMarketData>;
}
export enum PriceDirection {
  Same = 0,
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
  direction?: PriceDirection;
  bidSize?: number;
  askSize?: number;
  delta?: number;
}
