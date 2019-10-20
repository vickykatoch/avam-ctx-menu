import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IMarketData, Instrument, IPriceLevel, PriceDirection } from 'fx';

const PRICES = [1.23456, 1.56789, 1.3234, 1.87654, 1.994523, 1.54392, 1.764531];
const DELTA = [0.001, 0.0021, 0.0031, 0.0045, 0.0001, 0.061];
const getRandom = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

@Injectable({ providedIn: 'root' })
export class FxMarketDataService {
  private subscribedInstrumentSet = new Set<string>();
  private notifier = new Subject<Record<string, IMarketData>>();
  private obs$ = this.notifier.asObservable();
  private isStarted = false;
  public data: Instrument[] = [
    { alias: '2_YEAR', tickSize: 4, priceFormat: 'tsy' },
    { alias: '3_YEAR', tickSize: 4, priceFormat: 'tsy' },
    { alias: '5_YEAR', tickSize: 4, priceFormat: 'tsy' },
    { alias: '7_YEAR', tickSize: 4, priceFormat: 'tsy' },
    { alias: '10_YEAR', tickSize: 4, priceFormat: 'tsy' },
    { alias: '30_YEAR', tickSize: 4, priceFormat: 'tsy' },
    { alias: 'gt-2', tickSize: 4, priceFormat: 'tsy' },
    { alias: 'gt-3', tickSize: 4, priceFormat: 'tsy' },
    { alias: 'gt-5', tickSize: 4, priceFormat: 'tsy' },
    { alias: 'gt-7', tickSize: 4, priceFormat: 'tsy' },
    { alias: 'gt-10', tickSize: 4, priceFormat: 'tsy' },
    { alias: 'gt-30', tickSize: 4, priceFormat: 'tsy' },
    { alias: 'gx-2', tickSize: 4, priceFormat: 'tsy' },
    { alias: 'gx-3', tickSize: 4, priceFormat: 'tsy' },
    { alias: 'gx-5', tickSize: 4, priceFormat: 'tsy' },
    { alias: 'gx-7', tickSize: 4, priceFormat: 'tsy' },
    { alias: 'gx-10', tickSize: 4, priceFormat: 'tsy' },
    { alias: 'gx-30', tickSize: 4, priceFormat: 'tsy' }
  ];

  subscribe(subscriber: string, instrument: Instrument): Observable<Record<string, IMarketData>> {
    this.subscribedInstrumentSet.add(instrument.alias);
    // tslint:disable-next-line: no-unused-expression
    !this.isStarted && this.start();
    return this.obs$;
  }
  unsubscribe(moduleName: string, instrument?: Instrument) {}
  private start() {
    if (!this.isStarted) {
      this.isStarted = true;
      setTimeout(() => {
        const data1 = this.generateData();
        this.notifier.next(data1);
      }, 100);

      setInterval(() => {
        const data = this.generateData();
        this.notifier.next(data);
      }, 500);
    }
  }

  private generateData(): Record<string, IMarketData> {
    const mktData: Record<string, IMarketData> = {};
    this.subscribedInstrumentSet.forEach(instrument => {
      const priceLevels: IPriceLevel[] = [];
      mktData[instrument] = {
        instrument,
        priceLevels
      };
      for (let level = 0; level < 5; level++) {
        const size = getRandom(10, 120);
        const priceDir = getRandom(0, 2) as PriceDirection;

        priceLevels.push({
          level,
          bid: PRICES[getRandom(0, PRICES.length - 1)],
          ask: PRICES[getRandom(0, PRICES.length - 1)],
          direction: priceDir,
          bidSize: getRandom(10, 120),
          askSize: getRandom(100, 200),
          delta: DELTA[getRandom(0, DELTA.length - 1)]
        });
      }
    });
    return mktData;
  }
}
